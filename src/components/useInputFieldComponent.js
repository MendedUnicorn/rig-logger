import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startAddOption } from '../slices/optionsSlice';
import { selectOptions } from '../selectors/optionsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

const useInputFieldComponent = (
  optionCategory,
  prefill,
  optionsInSelect = true
) => {
  const dispatch = useDispatch();
  const createOption = (option = null) => {
    return { label: option, value: option };
  };

  const optionsFromStore = useSelector(selectOptions(optionCategory));
  const optionsFormatted = optionsInSelect
    ? optionsFromStore.map((opt) => createOption(opt.name))
    : {};

  useEffect(() => {
    setOptions(optionsFormatted);
    setValue(prefill ? { label: prefill, value: prefill } : null);
  }, [optionsFromStore]);

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    try {
      await dispatch(startAddOption(optionCategory, { name: inputValue }));
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setValue(newOption);
      console.log('success adding ');
    } catch (e) {
      console.log(e, 'errir addign');
    }
  };
  const CustomInputField = (props) => {
    return (
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    );
  };
  return [CustomInputField, value, setValue];
};

export default useInputFieldComponent;
