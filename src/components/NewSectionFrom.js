import React, { useState } from 'react';
import Select from 'react-select';

const NewSectionForm = ({ handleAddRun }) => {
  const toolOptions = [
    { value: 'powerdriveorbit', label: 'PowerDrive Orbit' },
    { value: 'powerdrivexceed', label: 'PowerDrive Xceed' },
    { value: 'powerdrivexcel', label: 'PowerDrive Xcel' },
    { value: 'telescope', label: 'TeleScope' },
    { value: 'trulink', label: 'TruLink' },
    { value: 'arcvision', label: 'arcVISION' },
    { value: 'ecoscope', label: 'EcoScope' },
    { value: 'sonicscope', label: 'SonicScope' },
    { value: 'adnvision475', label: 'adnVISION475' },
    { value: 'provision', label: 'ProVISION' },
    { value: 'terrasphere', label: 'TerraSphere' },
    { value: 'spectraphere', label: 'SpectraSphere' },
  ];

  const [section, setSection] = useState('');
  const [run, setRun] = useState('');
  const [bha, setBha] = useState([]);

  const handleBhaChange = (data) => {
    const tools = data.map((tool) => tool.label);
    setBha(tools);
  };

  const clearFields = () => {
    setRun('');
    setBha([]);
    setSection('');
  };

  return (
    <div className='form--input-group'>
      <label htmlFor='run'>Run</label>
      <input
        type='text'
        name='run'
        id='run'
        value={run}
        onChange={(e) => setRun(e.target.value)}
      />
      {/* <button type='button' onClick={(e) => setRun(run)}>
        +
      </button> */}
      {run && (
        <div>
          <p>Run {run}</p>
          <label htmlFor='new-run'>Add New Run</label>

          <Select
            classNamePrefix='react-select'
            className='react-select-container'
            onChange={handleBhaChange}
            isMulti
            name='bha'
            options={toolOptions}
            closeMenuOnSelect
          />
          <div className='form__input-group--one-line'>
            <input
              type='text'
              name='section'
              id='section'
              onChange={(e) => setSection(e.target.value)}
              className='form__input-group--one-line__text'
              placeholder='Section: eg. 12.25, 8.5'
            />
            <div className='form__input-group--one-line__postfix'>in.</div>

            <button
              className='button form__input-group--one-line__button'
              disabled={bha.length > 0 ? false : true}
              onClick={() => {
                handleAddRun({ run, bha, section });
                clearFields();
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSectionForm;
