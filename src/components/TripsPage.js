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
  const dispatch = useDispatch();
  const sortByValue = useSelector((state) => state.filters.sortBy);
  const filterText = useSelector((state) => state.filters.text);
  const startDate = useSelector((state) => state.filters.startDate);
  const endDate = useSelector((state) => state.filters.endDate);

  const totalTrips = useSelector((state) => state.trips.length);
  const handleChange = (e) => {
    dispatch(sortBy(e.target.value));
  };

  const filteredData = useSelector(
    selectTripsSortedBy(sortByValue, filterText, startDate, endDate)
  );
  // fix text search filter
  const handleTextSearchChange = (e) => {
    dispatch(setTextFilter(e.target.value));
  };
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e ? format(e, 'yyyy-MM-dd') : ''));
  };
  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e ? format(e, 'yyyy-MM-dd') : ''));
  };

  return (
    <div className=''>
      <h2>All trips</h2>
      <p>
        Showing {filteredData.length} out of {totalTrips} trips
      </p>
      <select name='' id='' onChange={handleChange} value={sortByValue}>
        <option value='date'>Date</option>
        <option value='length'>Length</option>
        <option value='rig'>Rig</option>
      </select>
      <label htmlFor=''>Text Search</label>
      <input
        type='text'
        name=''
        id=''
        onChange={handleTextSearchChange}
        value={filterText}
      />
      <label htmlFor=''>From</label>
      <ReactDatePicker
        selected={startDate ? DateTime.fromISO(startDate).toJSDate() : null}
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
        selected={endDate ? DateTime.fromISO(endDate).toJSDate() : ''}
        onChange={handleEndDateChange}
        startDate={DateTime.fromISO(endDate).toJSDate()}
        showIcon
        isClearable
        placeholderText='Select dates'
        dateFormat={'MMM d, yyyy'}
        className='calendar-picker'
        showYearDropdown
        dropdownMode='select'
      />
      {filteredData &&
        filteredData.map((trip, i) => {
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
