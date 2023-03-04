import {
  Button,
  Combobox,
  Input,
  Label,
  makeStyles,
  Option,
  SpinButton,
  useId,
  tokens,
} from "@fluentui/react-components";
import React, { useEffect, useRef, useState } from "react";
import ComboBoxSingleInput from "./ComboBoxSingleInput";
import { AddCircle24Regular, Dismiss12Regular } from "@fluentui/react-icons";
import { NonceProvider } from "react-select";

const useStyles = makeStyles({
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
    flexWrap: "wrap",
    maxWidth: "250px",
  },
  runInput: {
    maxWidth: "50px",
  },
  sectionInput: { maxWidth: "80px" },
  toolInput: { flexGrow: 1 },
});

function RunInput(props) {
  const { bhaOptions, handleChangeRuns } = props;

  const [run, setRun] = useState("1");
  const [section, setSection] = useState("");
  const [bha, setBha] = useState("");

  const [matchingOptionsBha, setMatchingOptionsBha] = useState();
  const [customSearchBha, setCustomSearchBha] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const comboId = useId("combo-multi");
  const selectedListId = `${comboId}-selection`;

  const styles = useStyles();

  useEffect(() => {
    setMatchingOptionsBha(bhaOptions);
  }, [bhaOptions]);

  function onChangeSection(e, data) {
    const match = data.value.match(/(?:^[0-4]?[0-9])(?:\.\d{0,2})?$/gm);
    if (!data.value || match) {
      setSection(data.value);
    }
  }

  function onChangeBha(e) {
    const value = e.target.value;
    const matches = bhaOptions.filter((option) => {
      return (
        option.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
      );
    });
    setMatchingOptionsBha(matches);
    if (value.length && matches.length < 1) {
      setCustomSearchBha(value);
    } else {
      setCustomSearchBha("");
    }
  }

  const onOptionSelectBha = (e, data) => {
    const matchingOption =
      data.optionText && bhaOptions.includes(data.optionText);
    if (matchingOption) {
      setCustomSearchBha(undefined);
    } else {
      setCustomSearchBha(data.optionText);
    }
    setBha(data.optionText);
  };

  const selectedListRef = useRef(null);
  const comboboxInputRef = useRef(null);

  const onSelect = (e, data) => {
    setSelectedOptions(data.selectedOptions);
    setMatchingOptionsBha(bhaOptions);
  };
  const onTagClick = (option, index) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));

    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      optionToFocus.focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  function onClickAdd() {
    handleChangeRuns({ bha: selectedOptions, run: run.toString(), section });
    setRun((prev) => (+prev + 1).toString());
    setSection("");
    setSelectedOptions([]);
  }

  return (
    <form className="colleagues-input-container">
      <div>
        <SpinButton
          input={{ className: styles.runInput }}
          // className={styles.runInput}
          value={run}
          onChange={(e, d) => setRun(d.value)}
          appearance="underline"
          displayValue={`Run: ${run}`}
        />
      </div>
      <Input
        contentAfter={<p>in.</p>}
        className={styles.sectionInput}
        appearance="underline"
        value={section}
        onChange={onChangeSection}
        placeholder="Select Section"
      />
      <div className="combobox-with-tags">
        {/* <label id={comboId}>Best pets</label> */}
        {selectedOptions.length ? (
          <ul
            id={selectedListId}
            className={styles.tagsList}
            ref={selectedListRef}
          >
            {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
            <span id={`${comboId}-remove`} hidden>
              Remove
            </span>
            {selectedOptions.map((option, i) => (
              <li key={option}>
                <Button
                  size="small"
                  shape="circular"
                  appearance="primary"
                  icon={<Dismiss12Regular />}
                  iconPosition="after"
                  onClick={() => onTagClick(option, i)}
                  id={`${comboId}-remove-${i}`}
                  aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                >
                  {option}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
        <Combobox
          className={styles.toolInput}
          appearance="underline"
          aria-labelledby={comboId}
          freeform
          placeholder={`Select ${"Tools"}`}
          onChange={onChangeBha}
          onOptionSelect={onSelect}
          selectedOptions={selectedOptions}
          multiselect={true}
          positioning="below-start"
          style={{ color: "green" }}
          listbox={
            <div style={{ maxHeight: "300px" }}>
              {matchingOptionsBha &&
                matchingOptionsBha.map((option) => (
                  <Option key={option}>{option}</Option>
                ))}
            </div>
          }
        >
          {customSearchBha ? (
            <Option key="freeform" text={customSearchBha}>
              Search for "{customSearchBha}"
            </Option>
          ) : null}
          {matchingOptionsBha &&
            matchingOptionsBha.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
        </Combobox>
      </div>
      <Button
        icon={<AddCircle24Regular />}
        appearance="subtle"
        onClick={() => onClickAdd()}
      >
        Add
      </Button>
    </form>
  );
}

export default RunInput;
