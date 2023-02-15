import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptions } from '../selectors/optionsSelectors';

import OptionsCategory from './OptionsCategory';
const OptionsPage = () => {
  return (
    <div>
      <OptionsCategory categoryName='Rigs' type='rigs' />

      <OptionsCategory categoryName='Operators' type='operators' />
      <OptionsCategory categoryName='Contractors' type='contractors' />
      <OptionsCategory categoryName='DE' type='des' />
      <OptionsCategory categoryName='FSM' type='fsms' />
      <OptionsCategory categoryName='Colleagues' type='colleagues' />
      <OptionsCategory categoryName='Tools' type='tools' />
    </div>
  );
};

export default OptionsPage;
