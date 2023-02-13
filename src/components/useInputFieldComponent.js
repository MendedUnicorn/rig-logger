import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startAddOption } from '../slices/optionsSlice';
import { selectOptions } from '../selectors/optionsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

const useInputFieldComponent = (optionCategory, prefill) => {
  const dispatch = useDispatch();
  const createOption = (option) => {
    return { label: option, value: option };
  };
  const data = useSelector(selectOptions(optionCategory));

  const opts = data.map((opt) => createOption(opt.name));
  useEffect(() => {
    setOptions(opts);
    setValue(prefill ? { label: prefill, value: prefill } : null);
  }, [data]);

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    try {
      dispatch(startAddOption(optionCategory, { name: inputValue }));
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
      setIsLoading(false);
      setValue(newOption);
      console.log('success adding ');
    } catch (e) {
      console.log(e, 'errir addign');
    }
  };
  const CustomInputField = (props) => {
    // useEffect(() => {
    //   setValue(props.rig ? createOption(props.rig) : {});
    // }, []);

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
