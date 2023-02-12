import React, { useState } from 'react';
import NewSectionForm from './NewSectionFrom';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip, startAddTrip } from '../slices/tripsSlice';

const TripForm = (props) => {
  const initialInputValues = {
    rig: props.trip ? props.trip : '',
    operator: '',
    contractor: '',
    dateFrom: '',
    dateTo: '',
    fsm: '',
    de: '',
    colleagues: [],
    run: [],
    workedAs: [],
    id: '',
  };

  const people = [];

  const rigs = [
    'West Phoenix',
    'Gullfaks A',
    'Gullfaks B',
    'Gullfaks C',
    'Statfjord A',
    'Statfjord B',
    'Statfjord C',
    'Visund',
    'Brage',
    'West Bollsta',
    'Deepsea Bergen',
    'Deepsea Aberdeen',
    'Deepsea Stavanger',
    'Deepsea Atlantic',
  ];

  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleChange = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(inputValues);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };
  const handleAddColleague = () => {
    setInputValues((prevState) => ({
      ...prevState,
      colleagues: [...prevState.colleagues, { name, position }],
    }));
  };
  const handleAddRun = (data) => {
    setInputValues((prev) => ({ ...prev, run: [...prev.run, data] }));
  };

  const handleRemoveColleague = (e, name) => {
    e.preventDefault();
    setInputValues((prevState) => ({
      ...prevState,
      colleagues: prevState.colleagues.filter(
        (colleague) => colleague.name.toLowerCase() !== name.toLowerCase()
      ),
    }));
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setInputValues((prevState) => ({
        ...prevState,
        workedAs: [...prevState.workedAs, e.target.value],
      }));
    } else {
      const selectedWorkedAs = inputValues.workedAs.filter(
        (work) => work !== e.target.value
      );
      setInputValues({ ...inputValues, workedAs: [...selectedWorkedAs] });
    }
  };
  const handleRemoveRun = (e, runNr) => {
    e.preventDefault();
    setInputValues((prevState) => ({
      ...prevState,
      run: [...prevState.run.filter((run) => run.run !== runNr)],
    }));
  };

  const handleSubmitTrip = (e) => {
    e.preventDefault();
    dispatch(startAddTrip(inputValues));
  };

  return (
    <form className='form' onSubmit={handleSubmitTrip}>
      <div className='form__input-group'>
        <label htmlFor='rig'>Rig</label>
        <input
          type='text'
          name='rig'
          id='rig'
          onChange={handleChange}
          value={props.trip ? props.trip.rig : inputValues.rig}
        />
        <label htmlFor='operator'>Operator</label>
        <input
          type='text'
          name='operator'
          id='operator'
          onChange={handleChange}
          value={props.trip ? props.trip.operator : inputValues.operator}
        />
        <label htmlFor='contractor'>Contractor</label>
        <input
          type='text'
          name='contractor'
          id='contractor'
          onChange={handleChange}
          value={props.trip ? props.trip.contractor : inputValues.contractor}
        />
      </div>

      <div className='form__input-group--checkbox'>
        <div className='form__input-group__checkbox-group'>
          <label htmlFor='workedAs'>MWD</label>
          <input
            type='checkbox'
            id='mwd'
            value='mwd'
            name='workedAs'
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='form__input-group__checkbox-group'>
          <label htmlFor='workedAs'>DD</label>
          <input
            type='checkbox'
            id='dd'
            value='dd'
            name='workedAs'
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='form__input-group__checkbox-group'>
          <label htmlFor='workedAs'>JPG Engineer</label>
          <input
            type='checkbox'
            id='jpg'
            value='jpg'
            name='workedAs'
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='form__input-group__checkbox-group'>
          <label htmlFor='workedAs'>Seismic Engineer</label>
          <input
            type='checkbox'
            id='seismicengineer'
            value='seismicengineer'
            name='workedAs'
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div className='form__input-group'>
        <label htmlFor='dateFrom'>From</label>
        <input
          type='date'
          name='dateFrom'
          id='dateFrom'
          onChange={handleChange}
        />
        <label htmlFor='dateTo'>To</label>
        <input type='date' name='dateTo' id='dateTo' onChange={handleChange} />
      </div>

      <div className='form__input-group'>
        <label htmlFor='fsm'>FSM</label>
        <input type='text' name='fsm' id='fsm' onChange={handleChange} />
        <label htmlFor='de'>DE</label>
        <input type='text' name='de' id='de' onChange={handleChange} />
      </div>

      <div className='form__input-group'>
        <label htmlFor='colleague'>Colleague</label>
        <div className='form__input-group--one-line'>
          <input
            type='text'
            name='colleague'
            id='colleague'
            onChange={handleNameChange}
            className='form__input-group--one-line__text'
          />
          <select
            id='positions'
            onChange={handlePositionChange}
            className='form__input-group--one-line__select'
          >
            <option value='mwd'>MWD</option>
            <option value='dd'>DD</option>
            <option value='dataengineer'>Data Engineer</option>
            <option value='mudlogger'>Mud Logger</option>
            <option value='geologist'>Geologist</option>
          </select>
          <button
            className='button form__input-group--one-line__button'
            type='button'
            onClick={handleAddColleague}
            disabled={name ? false : true}
          >
            +
          </button>
        </div>
      </div>
      <div className='form__input-group'>
        {inputValues.colleagues &&
          inputValues.colleagues.map((colleague) => {
            return (
              <p key={colleague.name} id={colleague.name}>
                {colleague.name} - {colleague.position}{' '}
                <button
                  onClick={(e) => handleRemoveColleague(e, colleague.name)}
                >
                  X
                </button>
              </p>
            );
          })}
      </div>
      <div className='form__input-group'>
        <NewSectionForm
          handleAddRun={handleAddRun}
          handleRemoveRun={handleRemoveRun}
        />
      </div>
      <div className='form__input-group'>
        {inputValues.run.map((run) => {
          return (
            <div>
              <p>
                Run nr: {run.run} Section: {run.section}
              </p>
              <button onClick={(e) => handleRemoveRun(e, run.run)}>x</button>
              {run.bha.map((tool) => {
                return <p>{tool}</p>;
              })}
            </div>
          );
        })}
      </div>

      <div className='form__input-group'>
        <label htmlFor='notes'></label>
        <textarea
          name='notes'
          id='notes'
          cols='30'
          rows='10'
          onChange={handleChange}
        ></textarea>
      </div>

      <button className='button submit'>Add Trip</button>
    </form>
  );
};

export default TripForm;
