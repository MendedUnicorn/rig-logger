import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCreateDataset,
  selectTopBottomColleague,
  selectTopBottomXofY,
  selectTotalAmountOfTrips,
} from '../selectors/tripSelectors';

import Ranked from './statistics/Ranked';
import { format } from 'date-fns';
import { DateTime } from 'luxon';
import ImportFromDawinci from './ImportFromDawinci';
import BarChart from './statistics/BarChart';
import ReactDatePicker from 'react-datepicker';
import MapChart from './statistics/MapChart';

const OverviewPage = () => {
  // const data = useSelector((state) => state.trips);
  const [startDate, setStartDate] = useState(
    DateTime.now().startOf('year').toFormat('yyyy-LL-dd')
  );
  const [endDate, setEndDate] = useState(DateTime.now().toFormat('yyyy-LL-dd'));

  const data = useSelector(selectCreateDataset(startDate, endDate));

  // finds data with more than x days offshore -use selectors like this for filters
  // const dataFiltered = useSelector(
  //   selectBetweenDates('2022-01-01', '2023-12-31')
  // ); //useSelector(selectTripsWithDays(1, '>'));

  const numberOfTrips = useSelector(selectTotalAmountOfTrips);

  // const ds = useSelector(selectCreateDataset('2020-03-14', '2023-09-04'));

  // const test = useSelector(selectTopXOfY(5, 'colleagues'));
  const top = useSelector(selectTopBottomColleague(3));
  const topRig = useSelector(selectTopBottomXofY('de', 3));

  const handleStartDateChange = (e) => {
    setStartDate(e ? format(e, 'yyyy-MM-dd') : '');
  };
  const handleEndDateChange = (e) => {
    setEndDate(e ? format(e, 'yyyy-MM-dd') : '');
  };

  return (
    <div className='overview'>
      <h2>Overview</h2>
      <p>Stats</p>
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

      {data && (
        <div>
          <p>Total trips {numberOfTrips}</p>
        </div>
      )}
      {data && <BarChart data={data} />}
      <MapChart />
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
