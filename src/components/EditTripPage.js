import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TripForm from './TripForm';
import { getTripById } from '../selectors/tripSelectors';

const EditTripPage = () => {
  const { id } = useParams();

  const data = useSelector(getTripById(id));

  return (
    <div>
      <TripForm trip={data} />
    </div>
  );
};

export default EditTripPage;
