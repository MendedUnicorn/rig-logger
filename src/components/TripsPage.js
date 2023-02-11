import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrips } from '../slices/tripsSlice';
import TripCard from './TripCard';

const TripsPage = () => {
  const data = useSelector((state) => state.trips);
  //
  //   console.log(getData);
  //   useEffect(() => {
  //     const dataFromStorage = JSON.parse(localStorage.getItem('trips'));
  //     setData(dataFromStorage);
  //   }, []);

  return (
    <div className=''>
      <h2>All trips</h2>
      <p>See all your trips here</p>
      {data &&
        data.map((trip) => {
          return <TripCard trip={trip} key={trip.uuid} />;
        })}
    </div>
  );
};

export default TripsPage;
