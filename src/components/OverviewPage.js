import { collectionGroup } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { unstable_useBlocker } from 'react-router-dom';
import { changeFieldName, fix } from '../helpers/databaseManipulation';
import {
  selectNumberOfTrips,
  selectTopBottomColleague,
  selectTopXOfY,
} from '../selectors/tripSelectors';
import { selectTripsWithDays } from '../selectors/tripSelectors';
import TripCard from './TripCard';

const OverviewPage = () => {
  const data = useSelector((state) => state.trips);

  // finds data with more than x days offshore -use selectors like this for filters
  const dataFiltered = useSelector(selectTripsWithDays(1, '>'));
  const numberOfTrips = useSelector(selectNumberOfTrips);

  // const test = useSelector(selectTopXOfY(5, 'colleagues'));
  const test = useSelector(selectTopBottomColleague(5));
  console.log(test);

  return (
    <div className=''>
      <h2>Overview</h2>
      <p>Stats</p>

      {data && (
        <div>
          <p>Total trips {numberOfTrips}</p>
        </div>
      )}
      {'test' && <p>Top 5 - {'test'}</p>}

      {dataFiltered &&
        dataFiltered.map((trip) => <TripCard trip={trip} key={trip.id} />)}
    </div>
  );
};

export default OverviewPage;
