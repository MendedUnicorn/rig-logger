import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startEditOption, startRemoveOption } from '../slices/optionsSlice';

const OptionElement = ({ option, type }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(option.name);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(startRemoveOption(type, id));
  };
  const handleEdit = (id, data) => {
    dispatch(startEditOption(type, id, data));
    setEditing(false);
  };

  return (
    <div className='option-element' key={option.id}>
      <div className='option-element__main'>
        <p>{option.name}</p>
        <div className='option-element__main__buttons'>
          <button
            className='option-element__main__buttons__edit-button'
            onClick={() => setEditing(!editing)}
          >
            Edit
          </button>
          <button
            className='option-element__main__buttons__delete-button'
            onClick={() => handleDelete(option.id)}
          >
            x
          </button>
        </div>
      </div>
      {editing && (
        <div className='option-element__edit'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => handleEdit(option.id, { name })} className=''>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionElement;
