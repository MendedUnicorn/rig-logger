import { Combobox, Label, Option } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

function ComboBoxSingleInput(props) {
  const { options, labelText, setValue, addButton } = props;
  const [matchingOptions, setMatchingOptions] = useState(options);
  const [customSearch, setCustomSearch] = useState();
  const comboId = "test";

  useEffect(() => {
    setCustomSearch(props.startValue);
    console.log(props.value);
  }, [props]);

  useEffect(() => {
    setMatchingOptions(options);
  }, [options]);

  const onChange = (e) => {
    const value = e.target.value;
    const matches = options.filter((option) => {
      return (
        option.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
      );
    });
    setMatchingOptions(matches);
    if (value.length && matches.length < 1) {
      setCustomSearch(value);
    } else {
      setCustomSearch(undefined);
    }
  };

  const onOptionSelect = (e, data) => {
    console.log(data);
    const matchingOption = data.optionText && options.includes(data.optionText);
    if (matchingOption) {
      setCustomSearch(undefined);
    } else {
      setCustomSearch(data.optionText);
    }
    setValue(data.optionText);
  };
  return (
    <form className="combobox-single-input">
      <Label id={comboId}>{labelText}</Label>
      <Combobox
        aria-labelledby={comboId}
        freeform
        placeholder={`Select ${labelText}`}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        value={props.startValue}
        {...props}
      >
        {customSearch ? (
          <Option key="freeform" text={customSearch}>
            Search for "{customSearch}"
          </Option>
        ) : null}
        {matchingOptions.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </form>
  );
}

export default ComboBoxSingleInput;
