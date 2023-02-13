const selectOptions = (optionCategory) => (state) => {
  return state.options[optionCategory];
};

export { selectOptions };
