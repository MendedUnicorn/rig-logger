import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOptions } from '../selectors/optionsSelectors';
import AddNewOption from './AddNewOption';
import OptionElement from './OptionElement';

const OptionsCategory = ({ categoryName, type }) => {
  const options = useSelector(selectOptions(type));
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <div>
      <div className='options-header'>
        <p>{categoryName}</p>
        <span onClick={() => setOptionsVisible(!optionsVisible)}>
          {optionsVisible ? '▽' : '△'}
        </span>
      </div>
      {options && optionsVisible ? (
        <div className='options-container'>
          {options.map((option) => (
            <OptionElement option={option} type={type} />
          ))}
          <AddNewOption type={type} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default OptionsCategory;
