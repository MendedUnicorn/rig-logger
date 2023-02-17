import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTripsSortedBy } from '../selectors/tripSelectors';
import { getAllTrips } from '../slices/tripsSlice';
import TripCard from './TripCard';
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortBy,
} from '../slices/filtersSlice';
import ReactDatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import { format } from 'date-fns';

const TripsPage = () => {
  const sortByValue = useSelector((state) => state.filters.sortBy);
  const filterText = useSelector((state) => state.filters.text);
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.filters.startDate);

  const endDate = useSelector((state) => state.filters.endDate);

  const handleChange = (e) => {
    dispatch(sortBy(e.target.value));
  };

  const data = useSelector(
    selectTripsSortedBy(sortByValue, filterText, startDate, endDate)
  );
  // fix text search filter
  const handleTextSearchChange = (e) => {
    dispatch(setTextFilter(e.target.value));
  };
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(format(e, 'yyyy-MM-dd')));
  };
  const handleEndDateChange = (e) => {
    dispatch(setEndDate(format(e, 'yyyy-MM-dd')));
  };

  return (
    <div className=''>
      <h2>All trips</h2>
      <p>See all your trips here</p>
      <select name='' id='' onChange={handleChange}>
        <option value='date'>Date</option>
        <option value='length'>Length</option>
        <option value='rig'>Rig</option>
      </select>
      <label htmlFor=''>Text Search</label>
      <input type='text' name='' id='' onChange={handleTextSearchChange} />
      <label htmlFor=''>From</label>
      <ReactDatePicker
        selected={DateTime.fromISO(startDate).toJSDate()}
        onChange={handleStartDateChange}
        startDate={DateTime.fromISO(startDate).toJSDate()}
        showIcon
        isClearable
        placeholderText='Select dates'
        dateFormat={'MMM d, yyyy'}
        className='calendar-picker'
        showYearDropdown
        dropdownMode='select'
      />
      <label htmlFor=''>To</label>
      <ReactDatePicker
        selected={DateTime.fromISO(endDate).toJSDate()}
        onChange={handleEndDateChange}
        startDate={DateTime.fromISO(endDate).toJSDate()}
        showIcon
        isClearable
        placeholderText='Select dates'
        dateFormat={'MMM d, yyyy'}
        className='calendar-picker'
        showYearDropdown
      />
      {data &&
        data.map((trip, i) => {
          return (
            <div className=''>
              <TripCard trip={trip} key={trip.id} />
            </div>
          );
        })}
    </div>
  );
};

export default TripsPage;
