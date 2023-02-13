import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { startRemoveTrip } from '../slices/tripsSlice';
import { useDispatch } from 'react-redux';
const TripCard = ({ trip }) => {
  const tripLength = (dateFrom, dateTo) => {
    const from = DateTime.fromISO(dateFrom);
    const to = DateTime.fromISO(dateTo);
    const diff = to.diff(from, 'days');

    return diff.toObject().days;
  };

  const dispatch = useDispatch();

  const calculateProgressbar = (days = 0) => {
    if (days > 14) {
      return '100%';
    } else {
      return (100 * days) / 14 + '%';
    }
  };

  const handleDelete = (id) => {
    console.log('clicked delete');
    dispatch(startRemoveTrip(id));
  };

  return (
    <div className='card'>
      <div className='card__container'>
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
          <button onClick={() => handleDelete(trip.id)} className='button'>
            Delete
          </button>
          <Link className='button' to={`/trip/${trip.id}/edit`}>
            Edit
          </Link>
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
