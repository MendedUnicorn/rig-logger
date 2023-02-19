import React from 'react';
import { useState } from 'react';

const ToggleSwitch = ({ handleChecked }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label className='switch' onClick={(e) => handleChecked(e.target.checked)}>
      <input type='checkbox' />
      <span className='slider'></span>
    </label>
  );
};

export default ToggleSwitch;
