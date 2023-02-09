import React, { useState } from 'react';
import Select from 'react-select';
import NewSectionForm from './NewSectionFrom';

const TripForm = () => {
  //   const [rig, setRig] = useState('');
  //   const [operator, setOperator] = useState('');
  //   const [contractor, setContractor] = useState('');
  //   const [dateFrom, setDateFrom] = useState('');
  //   const [dateTo, setDateTo] = useState('');
  //   const [fsm, setFsm] = useState('');
  //   const [de, setDe] = useState('');
  //   const [colleague, setColleague] = useState({});
  //   const [colleagues, setColleagues] = useState([]);
  //   const [section, setSection] = useState({});
  //   const [sections, setSections] = useState([]);
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
  };

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [colleague, setColleague] = useState({});
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [sections, setSections] = useState({});

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

  return (
    <form
      className='form'
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputValues);
      }}
    >
      <div className='form__input-group'>
        <label htmlFor='rig'>Rig</label>
        <input type='text' name='rig' id='rig' onChange={handleChange} />
        <label htmlFor='operator'>Operator</label>
        <input
          type='text'
          name='operator'
          id='operator'
          onChange={handleChange}
        />
        <label htmlFor='contractor'>Contractor</label>
        <input
          type='text'
          name='contractor'
          id='contractor'
          onChange={handleChange}
        />
      </div>

      <div className='form__input-group'>
        <label htmlFor='workedAs'>MWD</label>
        <input type='checkbox' id='mwd' value='mwd' name='workedAs' />
        <label htmlFor='workedAs'>dd</label>
        <input type='checkbox' id='dd' value='dd' name='workedAs' />
        <label htmlFor='workedAs'>JPG Engineer</label>
        <input type='checkbox' id='jpg' value='jpg' name='workedAs' />
        <label htmlFor='workedAs'>Seismic Engineer</label>
        <input
          type='checkbox'
          id='seismicengineer'
          value='seismicengineer'
          name='workedAs'
        />
      </div>

      <div className='form__input-group'>
        <label htmlFor='date-from'>From</label>
        <input
          type='date'
          name='date-from'
          id='date-from'
          onChange={handleChange}
        />
        <label htmlFor='date-to'>To</label>
        <input
          type='date'
          name='date-to'
          id='date-to'
          onChange={handleChange}
        />
      </div>

      <div className='form__input-group'>
        <label htmlFor='fsm'>FSM</label>
        <input type='text' name='fsm' id='fsm' onChange={handleChange} />
        <label htmlFor='de'>DE</label>
        <input type='text' name='de' id='de' onChange={handleChange} />
      </div>
      <div className='form__input-group'>
        <label htmlFor='colleague'>Colleague</label>
        <input
          type='text'
          name='colleague'
          id='colleague'
          onChange={handleNameChange}
        />
        <select id='positions' onChange={handlePositionChange}>
          <option value='mwd'>MWD</option>
          <option value='dd'>DD</option>
          <option value='dataengineer'>Data Engineer</option>
          <option value='mudlogger'>Mud Logger</option>
          <option value='geologist'>Geologist</option>
        </select>
        <button type='button' onClick={handleAddColleague}>
          +
        </button>
      </div>
      <div className='form__input-group'>
        {inputValues.colleagues.map((colleague) => {
          return (
            <p>
              {colleague.name} - {colleague.position}
            </p>
          );
        })}
      </div>
      <NewSectionForm handleAddRun={handleAddRun} />
      <label htmlFor='notes'></label>
      <textarea name='notes' id='notes' cols='30' rows='10'></textarea>

      <button>Add Trip</button>
    </form>
  );
};

export default TripForm;
