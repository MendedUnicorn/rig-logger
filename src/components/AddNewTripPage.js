import React from 'react';
import TripForm from './TripForm';

const AddNewTripPage = () => {
  return (
    <div>
      <div className='page-header'>
        <h2 className='page-header__title'>Add new trip</h2>
      </div>
      <TripForm />
    </div>
  );
};

export default AddNewTripPage;
