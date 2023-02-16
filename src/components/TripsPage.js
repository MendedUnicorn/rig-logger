import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTripsSortedBy } from '../selectors/tripSelectors';
import { getAllTrips } from '../slices/tripsSlice';
import TripCard from './TripCard';
import { setTextFilter, sortBy } from '../slices/filtersSlice';

const TripsPage = () => {
  const sortByValue = useSelector((state) => state.filters.sortBy);
  const data = useSelector(selectTripsSortedBy(sortByValue));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(sortBy(e.target.value));
  };

  // fix text search filter
  const handleTextSearchChange = (e) => {
    dispatch(setTextFilter(e.target.value));
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
