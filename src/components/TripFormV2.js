import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Combobox,
  Divider,
  Option,
} from "@fluentui/react-components";
import { useSelector } from "react-redux";
import { selectOptions } from "../selectors/optionsSelectors";
import { selectTopBottomColleague } from "../selectors/tripSelectors";
import ComboBoxSingleInput from "./form/ComboBoxSingleInput";
import CheckBoxGroup from "./form/CheckBoxGroup";

import ColleaguesInput from "./form/ColleaguesInput";
import ColleaguesTableView from "./form/ColleaguesTableView";

const Tripform = (props) => {
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
    (colleague) => colleague.name
  );

  // State for form
  const [rig, setRig] = useState();
  const [operator, setOperator] = useState();
  const [contractor, setContractor] = useState();
  const [fsm, setFsm] = useState();
  const [de, setDe] = useState();
  const [workedAs, setWorkedAs] = useState([]);
  const [colleagues, setColleagues] = useState([]);

  function handleSetWorkedAs(mwd, dd, jpg, seismic) {
    setWorkedAs([]);
    if (arguments[0]) setWorkedAs((prevState) => [...prevState, "mwd"]);
    if (arguments[1]) setWorkedAs((prevState) => [...prevState, "dd"]);
    if (arguments[2]) setWorkedAs((prevState) => [...prevState, "jpg"]);
    if (arguments[3]) setWorkedAs((prevState) => [...prevState, "seismic"]);
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

  return (
    <div>
      <div className="input-group">
        <ComboBoxSingleInput
          options={rigOptions}
          setValue={() => ""}
          labelText="Rig"
        />
        <ComboBoxSingleInput
          options={operatorOptions}
          setValue={() => ""}
          labelText="Operator"
        />
        <ComboBoxSingleInput
          options={contractorOptions}
          setValue={() => ""}
          labelText="Contractor"
        />
        <Divider />
      </div>
      <div className="input-group">
        <ComboBoxSingleInput
          options={fsmOptions}
          setValue={() => ""}
          labelText="FSM"
        />
        <ComboBoxSingleInput
          options={deOptions}
          setValue={() => ""}
          labelText="DE"
        />
      </div>

      <div className="input-group">
        <CheckBoxGroup handleChangeCheckbox={handleSetWorkedAs} />
      </div>

      <div className="input-group">
        <ColleaguesInput
          colleagueOptions={colleagueOptions}
          colleaguePositionOptions={colleaguePositionOptions}
          handleChangeColleagues={handleSetColleagues}
        />
      </div>
      <div className="input-group">
        <ColleaguesTableView
          colleagues={colleagues}
          handleRemoveColleague={handleRemoveColleague}
        />
      </div>
    </div>
  );
};

export default Tripform;
