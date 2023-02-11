import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
const TripCard = ({ trip }) => {
  const tripLength = (dateFrom, dateTo) => {
    const from = DateTime.fromISO(dateFrom);
    const to = DateTime.fromISO(dateTo);
    const diff = to.diff(from, 'days');

    return diff.toObject().days;
  };

  const calculateProgressbar = (days = 0) => {
    if (days > 14) {
      return '100%';
    } else {
      return (100 * days) / 14 + '%';
    }
  };
  console.log(calculateProgressbar());
  console.log(tripLength('2023-01-01', '2023-01-10'));
  return (
    <div className='card'>
      <div className='card__container' key={trip.uuid}>
        <div className='card__container__info'>
          <h2>{trip.rig}</h2>
          <h4>{trip.operator}</h4>
          <h5>{trip.contractor}</h5>
          <p>{tripLength(trip.dateFrom, trip.dateTo)} days</p>
        </div>
        <div className='card__container__mid'></div>
        <div className='card__container__end'>
          <h5>{trip.workedAs}</h5>
          <div className='card__container__end__dates'>
            <p>From: {trip.dateFrom}</p>
            <p>To: {trip.dateTo}</p>
          </div>
        </div>
        <div className='card__container__edit'>
          <Link to={`/trip/${trip.uuid}/edit`}>x</Link>
        </div>
      </div>

      <div className='trip-length'>
        <div
          className='bar'
          style={{
            width: calculateProgressbar(tripLength(trip.dateFrom, trip.dateTo)),
          }}
        ></div>
      </div>
    </div>
  );
};

export default TripCard;
