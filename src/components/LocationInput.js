import React, { useEffect, useState } from 'react';
import Cleave from 'cleave.js/react';
import { multipleInputsInOne } from '../helpers/multipleInputsInOne';
const LocationInput = () => {
  const [deg, setDeg] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [error, setError] = useState([]);
  const [titude, setTitude] = useState('');
  useEffect(() => {
    const container = document.getElementById('container');
    console.log(container);
    multipleInputsInOne(container);
  }, []);

  const onDegBlur = (e) => {
    const value = e.target.value;
    if (!value.match(/[0-8]\d/g)) {
      setError((prev) => [...prev, 'The degrees needs to be between 0 and 90']);
    } else if (!value || value.match(/[0-8]\d/g)) {
      setError((prev) =>
        prev.filter((d) => d === 'The degrees needs to be between 0 and 90')
      );
      setDeg(value);
    }
  };
  const onMinutesBlur = (e) => {
    const value = e.target.value;
    if (!value.match(/[0-5]\d/g)) {
      setError((prev) => [...prev, 'The minutes needs to be between 0 and 59']);
    } else if (!value || value.match(/[0-5]\d/g)) {
      setError((prev) =>
        prev.filter((d) => d === 'The minutes needs to be between 0 and 59')
      );
      setMinutes(value);
    }
  };
  const onSecondsBlur = (e) => {
    const value = e.target.value;
    if (!value.match(/[0-5]\d\.\d+/g)) {
      setError((prev) => [...prev, 'The seconds needs to be between 0 and 59']);
    } else if (!value || value.match(/[0-5]\d\.\d+/g)) {
      setError((prev) =>
        prev.filter((d) => d === 'The seconds needs to be between 0 and 59')
      );
      setSeconds(value);
    }
  };

  const handleTitude = () => {
    if (
      deg.match(/[0-8]\d/g) &&
      minutes.match(/[0-8]\d/g) &&
      seconds.match(/[0-5]\d\.\d+/g)
    ) {
      setTitude(`${deg} -  ${minutes} ${seconds}`);
    } else {
      setTitude('');
    }
  };
  return (
    <div id='container'>
      {/* <label htmlFor='longtitude'>Longtitude</label> */}
      <input
        type='text'
        name='deg'
        id='deg'
        className='deg'
        maxLength={2}
        onChange={(e) => {
          setDeg(e.target.value);
          handleTitude();
        }}
        value={deg}
        onBlur={onDegBlur}
      />
      {/* <label htmlFor='latitude'>Latitude</label> */}
      <input
        type='text'
        name='minutes'
        id='minutes'
        maxLength={2}
        pattern='[0-5]\d'
        onBlur={onMinutesBlur}
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
          handleTitude();
        }}
      />
      <input
        type='text'
        name='seconds'
        id='seconds'
        maxLength={7}
        onBlur={onSecondsBlur}
        value={seconds}
        onChange={(e) => {
          setSeconds(e.target.value);
          handleTitude();
        }}
      />
      {error && (
        <div className='error'>
          <p>Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
