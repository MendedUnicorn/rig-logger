import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/dist/declarations/src/Creatable';
import { selectOptions } from '../selectors/optionsSelectors';

const InputField = ({ optionCategory, prefill }) => {
  const dispatch = useDispatch();
  const createOption = (option) => {
    return { label: option, value: option };
  };

  const optionsFromStore = useSelector(selectOptions(optionCategory));
  const optionsFormatted = optionsFromStore.map((opt) =>
    createOption(opt.name)
  );

  useEffect(() => {
    setOptions(optionsFormatted);
    setValue(prefill ? { label: prefill, value: prefill } : {});
  }, []);

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

export default InputField;
