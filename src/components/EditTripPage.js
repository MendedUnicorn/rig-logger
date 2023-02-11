import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TripForm from './TripForm';

const EditTripPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem('trips'));
    const trip = dataFromStorage.filter((t) => t.uuid === id)[0];
    setData(trip);
  }, []);

  return (
    <div onClick={console.log(data)}>
      <TripForm trip={data} />
    </div>
  );
};

export default EditTripPage;
