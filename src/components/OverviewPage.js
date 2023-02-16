import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBetweenDates,
  selectCreateDataset,
  selectNumberOfTrips,
  selectTopBottomColleague,
  selectTopBottomXofY,
  selectTotalAmountOfTrips,
} from '../selectors/tripSelectors';
import { selectTripsWithDays } from '../selectors/tripSelectors';
import TripCard from './TripCard';
import Ranked from './statistics/Ranked';
import GraphD3 from './statistics/GraphD3';
import { DateTime } from 'luxon';
import { processCSV } from '../helpers/importFromMinDawinci';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { dispatch } from 'd3';
import { startAddTrip } from '../slices/tripsSlice';
import ImportFromDawinci from './ImportFromDawinci';

const OverviewPage = () => {
  const data = useSelector((state) => state.trips);

  // finds data with more than x days offshore -use selectors like this for filters
  // const dataFiltered = useSelector(
  //   selectBetweenDates('2022-01-01', '2023-12-31')
  // ); //useSelector(selectTripsWithDays(1, '>'));

  const numberOfTrips = useSelector(selectTotalAmountOfTrips);

  // const ds = useSelector(selectCreateDataset('2020-03-14', '2023-09-04'));

  // const test = useSelector(selectTopXOfY(5, 'colleagues'));
  const top = useSelector(selectTopBottomColleague(3));
  const topRig = useSelector(selectTopBottomXofY('de', 3));

  return (
    <div className='overview'>
      <h2>Overview</h2>
      <p>Stats</p>

      {data && (
        <div>
          <p>Total trips {numberOfTrips}</p>
        </div>
      )}
      <GraphD3></GraphD3>
      <div className='overview-container'>
        <Ranked number={5} category={'rig'} />
        <Ranked number={5} category={'colleagues'} />
        <Ranked number={3} category={'fsm'} />
        <Ranked number={3} category={'de'} />
        <Ranked number={3} category={'operator'} />
        <Ranked number={3} category={'contractor'} />
      </div>
      {topRig && <p>{topRig}</p>}
      <ImportFromDawinci />
      {/* {dataFiltered &&
        dataFiltered.map((trip) => <TripCard trip={trip} key={trip.id} />)} */}
    </div>
  );
};

export default OverviewPage;
