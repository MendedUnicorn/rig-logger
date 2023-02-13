import React, { useState } from 'react';
import NewSectionForm from './NewSectionFrom';
import { useDispatch, useSelector } from 'react-redux';
import { startAddTrip } from '../slices/tripsSlice';
// import InputRig from './InputRig';
import useInputFieldComponent from './useInputFieldComponent';

const TripForm = (props) => {
  const initialInputValues = {
    rig: '',
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
  const [workedAs, setWorkedAs] = useState(
    props.trip ? props.trip.workedAs : []
  );
  const [dateFrom, setDateFrom] = useState(
    props.trip ? props.trip.dateFrom : ''
  );
  const [dateTo, setDateTo] = useState(props.trip ? props.trip.dateTo : '');

  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState(
    props.trip || initialInputValues
  );
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleChange = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
      setWorkedAs((prevState) => [...prevState, e.target.value]);
    } else {
      const selectedWorkedAs = workedAs.filter(
        (work) => work !== e.target.value
      );
      setWorkedAs(selectedWorkedAs);
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
    // dispatch(startAddTrip(inputValues));
    const dataToSubmit = {
      rig: rig.value,
      operator: operator.value,
      contractor: contractor.value,
      workedAs,
      dateFrom,
      dateTo,
      fsm: fsm.value,
      de: de.value,
      colleague: colleague.value,
    };
    console.log();
  };

  const handleLoadCheckmarks = (e, arr) => {
    arr.map((el) => {
      if (el == e.target.value) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <form className='form' onSubmit={handleSubmitTrip}>
      <div className='form__input-group'>
        <label htmlFor='rig'>Rig</label>
        {/* <input
          type='text'
          name='rig'
          id='rig'
          onChange={handleChange}
          value={inputValues.rig}
        /> */}

        <RigInput />
        <label htmlFor='operator'>Operator</label>
        <OperatorInput />
        {/* <input
          type='text'
          name='operator'
          id='operator'
          onChange={handleChange}
          value={inputValues.operator}
        /> */}

        <label htmlFor='contractor'>Contractor</label>
        <ContractorInput />
        {/* <input
          type='text'
          name='contractor'
          id='contractor'
          onChange={handleChange}
          value={inputValues.contractor}
        /> */}
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
            checked={workedAs.includes('mwd')}
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
            checked={workedAs.includes('dd')}
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
            checked={workedAs.includes('jpg')}
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
            checked={workedAs.includes('seismicengineer')}
          />
        </div>
      </div>

      <div className='form__input-group'>
        <label htmlFor='dateFrom'>From</label>
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
        />
      </div>

      <div className='form__input-group'>
        <label htmlFor='fsm'>FSM</label>
        {/* <input
          type='text'
          name='fsm'
          id='fsm'
          onChange={handleChange}
          value={inputValues.fsm}
        /> */}
        <FsmInput />
        <label htmlFor='de'>DE</label>
        {/* <input
          type='text'
          name='de'
          id='de'
          onChange={handleChange}
          value={inputValues.de}
        /> */}
        <DeInput />
      </div>

      <div className='form__input-group'>
        <label htmlFor='colleague'>Colleague</label>
        <div className='form__input-group--one-line'>
          {/* <input
            type='text'
            name='colleague'
            id='colleague'
            onChange={handleNameChange}
            className='form__input-group--one-line__text'
          /> */}
          <ColleagueInput />
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
          value={inputValues.notes}
        ></textarea>
      </div>

      <button className='button submit'>
        {props.trip ? 'Save' : 'Add Trip'}
      </button>
    </form>
  );
};

export default TripForm;
