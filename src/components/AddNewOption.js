import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startAddOption } from '../slices/optionsSlice';

const AddNewOption = ({ type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleAdd = () => {
    dispatch(startAddOption(type, { name }));
  };

  return (
    <div className='options-container__input'>
      <input
        type='text'
        name=''
        id=''
        value={name}
        onChange={(e) => setName(e.target.value)}
      />




      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default AddNewOption;
