import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startAddOption } from '../slices/optionsSlice';
import { selectRigOptions } from '../selectors/optionsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

const InputRig = ({ value, setValue }) => {
  const dispatch = useDispatch();
  const createOption = (option) => {
    return { label: option, value: option };
  };
  const data = useSelector(selectRigOptions);
  const rigOptions = data.map((rig) => createOption(rig.name));
  useEffect(() => {
    setOptions(rigOptions);
  }, [data]);

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    console.log('input value', inputValue);
    try {
      dispatch(startAddOption('rigs', { name: inputValue }));
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
      setIsLoading(false);
      setValue(newOption);
      console.log('success adding ');
    } catch (e) {
      console.log(e, 'errir addign');
    }
  };

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

export default InputRig;
