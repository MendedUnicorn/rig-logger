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
import { useSelector } from "react-redux";
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

const useStyle = makeStyles({
  datePicker: {
    borderTopRightRadius: 4,
  },
});

const Tripform = (props) => {
  const styles = useStyle();
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

  // State for form
  useEffect(() => {
    setRig(props.trip ? props.trip.rig : "");
    setOperator(props.trip ? props.trip.operator : "");
    setContractor(props.trip ? props.trip.contractor : "");
    setFsm(props.trip ? props.trip.fsm : "");
    setDe(props.trip ? props.trip.de : "");
    setWorkedAs(props.trip ? props.trip.workedAs : "");
    setColleagues(props.trip ? props.trip.colleagues : []);
    setRun(props.trip ? props.trip.runs : []);
    setNotes(props.trip ? props.trip.notes : "");
    setStartDate(props.trip ? props.trip.dateFrom : {});
    setEndDate(props.trip ? props.trip.dateTo : {});
    setLatitude(props.trip ? +props.trip?.location.lat : {});
    setLongitude(props.trip ? +props.trip?.location.long : {});
    setLoading(false);
  }, [props]);
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
    // if (arguments[0]) setWorkedAs((prevState) => [...prevState, "mwd"]);
    // if (arguments[1]) setWorkedAs((prevState) => [...prevState, "dd"]);
    // if (arguments[2]) setWorkedAs((prevState) => [...prevState, "jpg"]);
    // if (arguments[3]) setWorkedAs((prevState) => [...prevState, "seismic"]);
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

  //   const initialValues = props.trip ? {
  //     dateFrom: trip.dateFrom,
  //     dateTo: trip.dateTo,
  //     rig: trip.rig,
  //     operator: trip.operator,
  //     contractor: trip.contractor,
  //     fsm: trip
  //   }

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
              value={DateTime.fromISO(startDate).toJSDate()}
              onSelectDate={(date) => setStartDate(date)}
              firstDayOfWeek={DayOfWeek.Monday}
            />
            <Label>To</Label>
            <DatePicker
              value={DateTime.fromISO(endDate).toJSDate()}
              onSelectDate={(date) => setEndDate(date)}
              firstDayOfWeek={DayOfWeek.Monday}
            />
          </div>

          <div className="input-group">
            <ComboBoxSingleInput
              options={rigOptions}
              setValue={setRig}
              labelText="Rig"
              value={rig}
            />
            <ComboBoxSingleInput
              options={operatorOptions}
              setValue={setOperator}
              labelText="Operator"
              value={operator}
            />
            <ComboBoxSingleInput
              options={contractorOptions}
              setValue={setContractor}
              labelText="Contractor"
              value={contractor}
            />
            <Divider />
          </div>
          <div className="input-group">
            <ComboBoxSingleInput
              options={fsmOptions}
              setValue={setFsm}
              labelText="FSM"
              value={fsm}
            />
            <ComboBoxSingleInput
              options={deOptions}
              setValue={setDe}
              labelText="DE"
              value={de}
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
              handleTitude={() => ""}
              showSimple={false}
              defaultValue={latitude}
              type="latitude"
            />
            <Label>Longitude</Label>
            <LocationInput
              handleTitude={() => ""}
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
    </div>
  );
};

export default Tripform;
