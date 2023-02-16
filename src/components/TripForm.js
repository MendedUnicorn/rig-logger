import React, { useState } from 'react';
import SectionInput from './SectionInput';
import { useDispatch, useSelector } from 'react-redux';
import { startAddTrip, startUpdateTrip } from '../slices/tripsSlice';
import { redirect, useNavigate } from 'react-router-dom';
import useInputFieldComponent from './useInputFieldComponent';
import { DateTime } from 'luxon';
import DatePickerInput from './DatePicker';
import LocationInput from './LocationInput';

const TripForm = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [RigInput, rig, setRig] = useInputFieldComponent(
    'rigs',
    props.trip ? props.trip.rig : null
  );
  const [OperatorInput, operator, setOperator] = useInputFieldComponent(
    'operators',
    props.trip ? props.trip.operator : ''
  );
  const [ContractorInput, contractor, setContractor] = useInputFieldComponent(
    'contractors',
    props.trip ? props.trip.contractor : ''
  );
  const [FsmInput, fsm, setFsm] = useInputFieldComponent(
    'fsms',
    props.trip ? props.trip.fsm : ''
  );
  const [DeInput, de, setDe] = useInputFieldComponent(
    'des',
    props.trip ? props.trip.de : ''
  );
  const [ColleagueInput, colleague, setColleague] = useInputFieldComponent(
    'colleagues',
    props.trip ? props.trip.colleague : ''
  );
  const [PositionInput, position, setPosition] = useInputFieldComponent(
    'positions',
    props.trip ? props.trip.position : ''
  );

  const [workedAs, setWorkedAs] = useState(
    props.trip ? props.trip.workedAs : []
  );
  const [dateFrom, setDateFrom] = useState(
    props.trip ? DateTime.fromISO(props.trip.dateFrom).toJSDate() : ''
  );
  const [dateTo, setDateTo] = useState(
    props.trip ? DateTime.fromISO(props.trip.dateTo).toJSDate() : ''
  );
  const [colleaguesArray, setColleaguesArray] = useState(
    props.trip ? props.trip.colleagues : []
  );
  const [runs, setRuns] = useState(props.trip ? props.trip.runs : []);
  const [notes, setNotes] = useState(props.trip ? props.trip.notes : '');

  const dispatch = useDispatch();

  // Sanetize

  if (DateTime.fromISO(dateFrom) > DateTime.fromISO(dateTo)) {
    setErrors((prevState) => [
      ...prevState,
      'Start date cannot be after end date.',
    ]);
  }

  // change handlers
  const handleSetStartDate = (start) => {
    setDateFrom(start);
  };
  const handleSetEndDate = (end) => {
    setDateTo(end);
  };
  const handleAddColleaguesArray = () => {
    setColleaguesArray((prev) => [
      ...prev,
      { name: colleague.value, position: position.value },
    ]);
    setColleague('');
    setPosition('');
  };
  const handleRemoveColleaguesArray = (e, name) => {
    e.preventDefault();
    const newColleagues = colleaguesArray.filter(
      (colleague) => colleague.name.toLowerCase() !== name.toLowerCase()
    );
    setColleaguesArray(newColleagues);
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setWorkedAs((prevState) => [...prevState, e.target.value]);
    } else {
      const selectedWorkedAs = workedAs.filter(
        (work) => work !== e.target.value
      );
      setWorkedAs(selectedWorkedAs);
    }
  };
  const handleAddRun = (data) => {
    setRuns((prev) => [...prev, data]);
  };
  const handleRemoveRun = (e, runNr) => {
    e.preventDefault();
    setRuns((prev) => prev.filter((run) => run.run !== runNr));
  };

  const handleSubmitTrip = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      rig: rig ? rig.value : '',
      operator: operator ? operator.value : '',
      contractor: contractor ? contractor.value : '',
      workedAs,
      dateFrom: dateFrom ? dateFrom.toISOString() : '',
      dateTo: dateFrom ? dateTo.toISOString() : '',
      fsm: fsm ? fsm.value : '',
      de: de ? de.value : '',
      colleagues: colleaguesArray,
      runs,
      notes,
    };
    if (props.trip) {
      dispatch(startUpdateTrip(props.trip.id, dataToSubmit));
    } else {
      // add record
      dispatch(startAddTrip(dataToSubmit));
    }
    redirect('/trips');
    navigate('/trips');
  };

  return (
    <form className='form' onSubmit={handleSubmitTrip}>
      <div className='form__input-group'>
        <label htmlFor='rig'>Rig</label>
        <RigInput />
        <label htmlFor='operator'>Operator</label>
        <OperatorInput />

        <label htmlFor='contractor'>Contractor</label>
        <ContractorInput />
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
            checked={workedAs ? workedAs.includes('mwd') : false}
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
            checked={workedAs ? workedAs.includes('dd') : false}
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
            checked={workedAs ? workedAs.includes('jpg') : false}
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
            checked={workedAs ? workedAs.includes('seismicengineer') : false}
          />
        </div>
      </div>

      <div className='form__input-group'>
        <DatePickerInput
          handleSetStartDate={handleSetStartDate}
          startDate={props.trip ? new Date(props.trip.dateFrom) : dateFrom}
          handleSetEndDate={handleSetEndDate}
          endDate={props.tri ? new Date(props.trip.dateTo) : dateTo}
        />
        {/* <label htmlFor='dateFrom'>From</label>
        <input
          type='date'
          name='dateFrom'
          id='dateFrom'
          onChange={(e) => setDateFrom(e.target.value)}
          value={dateFrom}
        />
        <label htmlFor='dateTo'>To</label>
        <input
          type='date'
          name='dateTo'
          id='dateTo'
          onChange={(e) => setDateTo(e.target.value)}
          value={dateTo}
        /> */}
      </div>

      <div className='form__input-group'>
        <label htmlFor='fsm'>FSM</label>
        <FsmInput />
        <label htmlFor='de'>DE</label>
        <DeInput />
      </div>

      <div className='form__input-group'>
        <label htmlFor='colleague'>Colleague</label>
        <div className='form__input-group--one-line'>
          <ColleagueInput />
          <PositionInput />
          <button
            className='button form__input-group--one-line__button'
            type='button'
            onClick={handleAddColleaguesArray}
            disabled={colleague ? false : true}
          >
            +
          </button>
        </div>
      </div>
      <div className='form__input-group'>
        {colleaguesArray &&
          colleaguesArray.map((colleague) => {
            return (
              <p key={colleague.name} id={colleague.name}>
                {colleague.name} - {colleague.position}{' '}
                <button
                  onClick={(e) =>
                    handleRemoveColleaguesArray(e, colleague.name)
                  }
                >
                  X
                </button>
              </p>
            );
          })}
      </div>

      <div className='form__input-group'>
        <SectionInput
          handleAddRun={handleAddRun}
          handleRemoveRun={handleRemoveRun}
        />
      </div>
      <div className='form__input-group'>
        {runs &&
          runs.map((run, i) => {
            return (
              <div key={i}>
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
        <LocationInput />
      </div>
      <div className='form__input-group'>
        <label htmlFor='notes'></label>
        <textarea
          name='notes'
          id='notes'
          cols='30'
          rows='10'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
      </div>
      <div className='form__input-group'>
        <label htmlFor=''>Heliport</label>
        <input type='text' name='' id='' />
      </div>

      <button className='button submit'>
        {props.trip ? 'Save' : 'Add Trip'}
      </button>
    </form>
  );
};

export default TripForm;
