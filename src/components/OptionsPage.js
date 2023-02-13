import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptions } from '../selectors/optionsSelectors';

import OptionElement from './OptionElement';

const OptionsPage = () => {
  const contractorOptions = useSelector(selectOptions('contractors'));
  const operatorOptions = useSelector(selectOptions('operators'));
  const rigOptions = useSelector(selectOptions('rigs'));

  const [rigVisible, setRigVisible] = useState(false);
  const [operatorVisible, setOperatorVisible] = useState(false);
  const [contractorVisible, setContractorVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <div className='header'>
        <p>Rigs</p>
        <span onClick={() => setRigVisible(!rigVisible)}>
          {rigVisible ? '▽' : '△'}
        </span>
      </div>
      {rigOptions && rigVisible
        ? rigOptions.map((rig) => <OptionElement option={rig} type={'rigs'} />)
        : ''}

      <div className='header'>
        <p>Operators</p>
        <span onClick={() => setOperatorVisible(!operatorVisible)}>
          {operatorVisible ? '▽' : '△'}
        </span>
      </div>
      {operatorOptions && operatorVisible
        ? operatorOptions.map((operator) => (
            <OptionElement option={operator} type={'operators'} />
          ))
        : ''}

      <div className='header'>
        <p>Contractors</p>
        <span onClick={() => setContractorVisible(!contractorVisible)}>
          {contractorVisible ? '▽' : '△'}
        </span>
      </div>
      {contractorOptions && contractorVisible
        ? contractorOptions.map((contractor) => (
            <OptionElement option={contractor} type={'contractors'} />
          ))
        : ''}
    </div>
  );
};

export default OptionsPage;
