import { Button, Combobox, Label, Option } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import ComboBoxSingleInput from "./ComboBoxSingleInput";
import { AddCircle24Regular } from "@fluentui/react-icons";

function ColleaguesInput(props) {
  const { colleagueOptions, colleaguePositionOptions, handleChangeColleagues } =
    props;

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const [matchingOptionsColleague, setMatchingOptionsColleague] = useState();
  const [
    matchingOptionsColleaguePosition,
    setMatchingOptionsColleaguePosition,
  ] = useState();
  const [customSearchColleague, setCustomSearchColleague] = useState();
  const [customSearchColleaguePosition, setCustomSearchColleaguePosition] =
    useState();

  const comboId = "test";

  useEffect(() => {
    setMatchingOptionsColleague(colleagueOptions);
    setMatchingOptionsColleaguePosition(colleaguePositionOptions);
  }, [colleagueOptions, colleaguePositionOptions]);

  function onChangeColleague(e) {
    const value = e.target.value;
    const matches = colleagueOptions.filter((option) => {
      return (
        option.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
      );
    });
    setMatchingOptionsColleague(matches);
    if (value.length && matches.length < 1) {
      setCustomSearchColleague(value);
    } else {
      setCustomSearchColleague(undefined);
    }
  }
  const onChangeColleaguePosition = (e) => {
    const value = e.target.value;
    const matches = colleaguePositionOptions.filter((option) => {
      return (
        option.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
      );
    });
    setMatchingOptionsColleaguePosition(matches);
    if (value.length && matches.length < 1) {
      setCustomSearchColleaguePosition(value);
    } else {
      setCustomSearchColleaguePosition(undefined);
    }
  };

  const onOptionSelectColleague = (e, data) => {
    const matchingOption =
      data.optionText && colleagueOptions.includes(data.optionText);
    if (matchingOption) {
      setCustomSearchColleague(undefined);
    } else {
      setCustomSearchColleague(data.optionText);
    }
    setName(data.optionText);
  };
  const onOptionSelectColleaguePosition = (e, data) => {
    const matchingOption =
      data.optionText && colleaguePositionOptions.includes(data.optionText);
    if (matchingOption) {
      setCustomSearchColleaguePosition(undefined);
    } else {
      setCustomSearchColleaguePosition(data.optionText);
    }
    setPosition(data.optionText);
  };

  return (
    <form className="colleagues-input-container">
      <Combobox
        aria-labelledby={comboId}
        freeform
        placeholder={`Select ${"colleague"}`}
        onChange={onChangeColleague}
        onOptionSelect={onOptionSelectColleague}
        {...props}
      >
        {customSearchColleague ? (
          <Option key="freeform" text={customSearchColleague}>
            Search for "{customSearchColleague}"
          </Option>
        ) : null}
        {matchingOptionsColleague &&
          matchingOptionsColleague.map((option) => (
            <Option key={option}>{option}</Option>
          ))}
      </Combobox>

      <Combobox
        aria-labelledby={comboId}
        freeform
        placeholder={`Select ${"position"}`}
        onChange={onChangeColleaguePosition}
        onOptionSelect={onOptionSelectColleaguePosition}
        {...props}
      >
        {customSearchColleaguePosition ? (
          <Option key="freeform" text={customSearchColleaguePosition}>
            Search for "{customSearchColleaguePosition}"
          </Option>
        ) : null}
        {matchingOptionsColleaguePosition &&
          matchingOptionsColleaguePosition.map((option) => (
            <Option key={option}>{option}</Option>
          ))}
      </Combobox>
      <Button
        icon={<AddCircle24Regular />}
        appearance="secondary"
        onClick={() => handleChangeColleagues({ name, position })}
      >
        Add
      </Button>
    </form>
  );
}

export default ColleaguesInput;
