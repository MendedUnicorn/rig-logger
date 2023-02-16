import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const initialState = {
  text: '',
  sortBy: 'date',
  startDate: DateTime.now().startOf('month').toISO(),
  endDate: DateTime.now().endOf('month').toISO(),
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTextFilter: (state, action) => {
      return { ...state, text: action.payload };
    },
    sortByDate: (state, action) => {
      return { ...state, sortBy: 'date' };
    },
    sortBy: (state, action) => ({ ...state, sortBy: action.payload }),
    setStartDate: (state, action) => ({ ...state, startDate: action.payload }),
    setEndDate: (state, action) => ({ ...state, endDate: action.payload }),
  },
});

export const { setTextFilter, sortByDate, sortBy, setStartDate, setEndDate } =
  filtersSlice.actions;

export default filtersSlice.reducer;
