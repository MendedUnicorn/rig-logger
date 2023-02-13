import { collectionGroup } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNumberOfTrips } from '../selectors/tripSelectors';
import { selectTripsWithDays } from '../selectors/tripSelectors';
import TripCard from './TripCard';

const OverviewPage = () => {
  const data = useSelector((state) => state.trips);

  // finds data with more than x days offshore -use selectors like this for filters
  const dataFiltered = useSelector(selectTripsWithDays(8, '>-'));
  const numberOfTrips = useSelector(selectNumberOfTrips);

  return (
    <div className=''>
      <h2>Overview</h2>
      <p>Stats</p>

      {data && (
        <div>
          <p>Total trips {numberOfTrips}</p>
        </div>
      )}

      {dataFiltered &&
        dataFiltered.map((trip) => <TripCard trip={trip} key={trip.id} />)}
    </div>
  );
};

export default OverviewPage;
