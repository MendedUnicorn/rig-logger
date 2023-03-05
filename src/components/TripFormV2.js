import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Combobox,
  Divider,
  Label,
  makeStyles,
  Option,
  Textarea,
} from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import { selectOptions } from "../selectors/optionsSelectors";
import { selectTopBottomColleague } from "../selectors/tripSelectors";
import ComboBoxSingleInput from "./form/ComboBoxSingleInput";
import CheckBoxGroup from "./form/CheckBoxGroup";

import ColleaguesInput from "./form/ColleaguesInput";
import ColleaguesTableView from "./form/ColleaguesTableView";
import RunInput from "./form/RunInput";
import RunTableView from "./form/RunTableView";
import LocationInput from "./LocationInput";
import {
  DatePicker,
  DatePickerBase,
  DayOfWeek,
} from "@fluentui/react-date-time";
import { DateTime } from "luxon";
import { startAddTrip, startUpdateTrip } from "../slices/tripsSlice";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  datePicker: {
    borderTopRightRadius: 4,
  },
});

const Tripform = (props) => {
  const styles = useStyle();
  const navigate = useNavigate();
  // Options from store
  let rigOptions = useSelector(selectOptions("rigs")).map((rig) => rig.name);
  let operatorOptions = useSelector(selectOptions("operators")).map(
    (operator) => operator.name
  );
  let contractorOptions = useSelector(selectOptions("contractors")).map(
    (contractor) => contractor.name
  );
  let fsmOptions = useSelector(selectOptions("fsms")).map((fsm) => fsm.name);
  let deOptions = useSelector(selectOptions("des")).map((de) => de.name);
  let colleagueOptions = useSelector(selectOptions("colleagues")).map(
    (colleague) => colleague.name
  );
  let colleaguePositionOptions = useSelector(selectOptions("positions")).map(
    (position) => position.name
  );
  let bhaOptions = useSelector(selectOptions("tools")).map((tool) => tool.name);
  //   let defaultLat;
  // State for form

  useEffect(() => {
    console.log("d", props.dateFrom);

    setRig(props.trip ? props.trip.rig : "");
    setOperator(props.trip ? props.trip.operator : "");
    setContractor(props.trip ? props.trip.contractor : "");
    setFsm(props.trip ? props.trip.fsm : "");
    setDe(props.trip ? props.trip.de : "");
    setWorkedAs(props.trip ? props.trip.workedAs : "");
    setColleagues(props.trip ? props.trip.colleagues : []);
    setRun(props.trip ? props.trip.run : []);
    setNotes(props.trip ? props.trip.notes : "");
    setStartDate(
      props.trip ? DateTime.fromISO(props.trip.dateFrom).toJSDate() : null
    );
    setEndDate(
      props.trip ? DateTime.fromISO(props.trip.dateTo).toJSDate() : null
    );
    // defaultLat = props?.trip.location.lat;
    setLatitude(props.trip ? +props.trip?.location.lat : 0);
    setLongitude(props.trip ? +props.trip?.location.long : 0);
    setLoading(false);
  }, []);

  const [rig, setRig] = useState("");
  const [operator, setOperator] = useState("");
  const [contractor, setContractor] = useState("");
  const [fsm, setFsm] = useState("");
  const [de, setDe] = useState("");
  const [workedAs, setWorkedAs] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [run, setRun] = useState([]);
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(true);

  function handleSetWorkedAs(workedAsArr) {
    setWorkedAs(workedAsArr);
  }
  function handleSetColleagues(colleague) {
    setColleagues((prevState) => [...prevState, colleague]);
  }
  function handleRemoveColleague(name) {
    setColleagues((prevState) =>
      prevState.filter(
        (colleague) => colleague.name.toLowerCase() !== name.toLowerCase()
      )
    );
  }
  function handleSetRun(run) {
    setRun((prevState) => [...prevState, run]);
  }
  function handleRemoveRun(run) {
    setRun((prevState) => prevState.filter((r) => r.run !== run));
  }

  const dispatch = useDispatch();

  const handleSubmitTrip = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      rig: rig ? rig : "",
      operator: operator ? operator : "",
      contractor: contractor ? contractor : "",
      workedAs,
      dateFrom: startDate ? startDate.toISOString() : "",
      dateTo: endDate ? endDate.toISOString() : "",
      fsm: fsm ? fsm : "",
      de: de ? de : "",
      colleagues: colleagues ? colleagues : [],
      run: run ? run : [],
      notes: notes ? notes : "",
      location: {
        lat: latitude ? latitude.toString() : "",
        long: longitude ? longitude.toString() : "",
      },
    };

    if (props.trip) {
      console.log("some", { ...dataToSubmit });
      console.log("all", { ...props.trip, ...dataToSubmit });
      dispatch(
        startUpdateTrip(props.trip.id, { ...props.trip, ...dataToSubmit })
      );
    } else {
      // add record
      console.log(dataToSubmit);
      dispatch(startAddTrip(dataToSubmit));
    }

    navigate("/trips");
  };

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="input-group">
            <Label>From</Label>
            <DatePicker
              className={styles.datePicker}
              value={startDate}
              onSelectDate={(date) => setStartDate(date)}
              firstDayOfWeek={DayOfWeek.Monday}
            />
            <Label>To</Label>
            <DatePicker
              value={endDate}
              onSelectDate={(date) => setEndDate(date)}
              firstDayOfWeek={DayOfWeek.Monday}
            />
          </div>

          <div className="input-group">
            <ComboBoxSingleInput
              options={rigOptions}
              setValue={setRig}
              labelText="Rig"
              startValue={rig}
            />
            <ComboBoxSingleInput
              options={operatorOptions}
              setValue={setOperator}
              labelText="Operator"
              startValue={operator}
            />
            <ComboBoxSingleInput
              options={contractorOptions}
              setValue={setContractor}
              labelText="Contractor"
              startValue={contractor}
            />
            <Divider />
          </div>
          <div className="input-group">
            <ComboBoxSingleInput
              options={fsmOptions}
              setValue={setFsm}
              labelText="FSM"
              startValue={fsm}
            />
            <ComboBoxSingleInput
              options={deOptions}
              setValue={setDe}
              labelText="DE"
              startValue={de}
            />
          </div>

          <div className="input-group">
            <Label>Worked As</Label>
            <CheckBoxGroup
              handleChangeCheckbox={handleSetWorkedAs}
              data={workedAs}
            />
          </div>

          <div className="input-group">
            <Label>Colleagues</Label>
            <ColleaguesInput
              colleagueOptions={colleagueOptions}
              colleaguePositionOptions={colleaguePositionOptions}
              handleChangeColleagues={handleSetColleagues}
            />
          </div>
          <div className="input-group">
            {colleagues?.length > 0 ? (
              <ColleaguesTableView
                colleagues={colleagues}
                handleRemoveColleague={handleRemoveColleague}
              />
            ) : null}
          </div>
          <div className="input-group">
            <Label>Runs</Label>
            <RunInput bhaOptions={bhaOptions} handleChangeRuns={handleSetRun} />
          </div>
          <div className="input-group">
            {run?.length > 0 ? (
              <RunTableView
                runs={run}
                handleRemoveRun={handleRemoveRun}
              ></RunTableView>
            ) : null}
          </div>
          <div className="input-group">
            <Label>Latitude</Label>
            <LocationInput
              handleTitude={setLatitude}
              showSimple={false}
              defaultValue={latitude}
              type="latitude"
            />
            <Label>Longitude</Label>
            <LocationInput
              handleTitude={setLongitude}
              showSimple={false}
              defaultValue={longitude}
              type="longitude"
            />
          </div>

          <div className="input-group">
            <div className="container">
              <Label>Notes</Label>
              <Textarea
                placeholder="Write some notes about the trip"
                size="large"
                value={notes}
                onChange={(e, data) => setNotes(data.value)}
              />
            </div>
          </div>
        </>
      )}
      <div className="input-group">
        <Button onClick={(e) => handleSubmitTrip(e)} appearance="primary">
          {props.trip ? "Save" : "Add New Trip"}
        </Button>
        <Button onClick={() => navigate("/trips")}>Cancel</Button>
      </div>
    </div>
  );
};

export default Tripform;
