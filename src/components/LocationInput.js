import React, { useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import { multipleInputsInOne } from "../helpers/multipleInputsInOne";
const LocationInput = ({ handleTitude, showSimple, defaultValue, type }) => {
  useEffect(() => {
    setDeg(defaultValue ? Math.floor(defaultValue) : "");
    setMinutes(defaultValue ? Math.floor((defaultValue % 1) * 60) : "");
    setSeconds(
      defaultValue ? ((((defaultValue % 1) * 60) % 1) * 60).toFixed(4) : ""
    );
  }, [defaultValue]);

  const [deg, setDeg] = useState(defaultValue ? Math.floor(defaultValue) : "");
  const [minutes, setMinutes] = useState(
    defaultValue ? Math.floor((defaultValue % 1) * 60) : ""
  );
  const [seconds, setSeconds] = useState(
    defaultValue ? ((((defaultValue % 1) * 60) % 1) * 60).toFixed(4) : ""
  );
  const [simpleLocation, setSimpleLocation] = useState(
    defaultValue ? defaultValue : ""
  );

  const [error, setError] = useState(null);

  useEffect(() => {
    if (showSimple) {
      console.log(simpleLocation);
      handleTitude(simpleLocation);
    } else {
      const titude = +deg + +minutes / 60 + +seconds / 3600;
      handleTitude(titude);
    }
  }, [deg, minutes, seconds, showSimple, simpleLocation]);

  useEffect(() => {
    const container = document.getElementsByClassName(
      `location-input__container-${type}`
    )[0];
    container && multipleInputsInOne(container);
  });

  const handleChangeDeg = (e) => {
    const num = e.target.value;
    if (!num || num.match(/^[0-8]?[0-9]$|^90$/gm)) {
      setDeg(() => num);
    }
  };
  const handleChangeMinutes = (e) => {
    const num = e.target.value;
    if (!num || num.match(/^[0-5]?[0-9]$/gm)) {
      setMinutes(() => num);
    }
  };
  const handleChangeSeconds = (e) => {
    const num = e.target.value;
    if (!num || num.match(/(?:^[0-5]?[0-9])(?:\.\d{0,4})?$/gm)) {
      setSeconds(() => num);
    }
  };

  const handleSimpleLocation = (e) => {
    const num = e.target.value;
    if (!num || num.match(/(?:^[0-8]?[0-9])(?:\.\d{0,8})?$|^90$/gm)) {
      setSimpleLocation(() => num);
    }
  };

  return (
    <div className="location-input">
      {!showSimple ? (
        <div className={`location-input__container-${type}`}>
          <input
            type="text"
            name="deg"
            id="deg"
            className="deg"
            maxLength={2}
            value={deg}
            onChange={(e) => {
              handleChangeDeg(e);
            }}
          />
          <span>°</span>
          <input
            type="text"
            name="minutes"
            id="minutes"
            maxLength={2}
            value={minutes}
            onChange={(e) => {
              handleChangeMinutes(e);
            }}
          />
          <span>'</span>
          <input
            type="text"
            name="seconds"
            id="seconds"
            maxLength={6}
            value={seconds}
            onChange={(e) => {
              handleChangeSeconds(e);
            }}
          />
          <span>"</span>
        </div>
      ) : (
        <input
          type="text"
          className="location-simple"
          value={simpleLocation}
          onChange={handleSimpleLocation}
        />
      )}

      {error && (
        <div className="error">
          <p>Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
