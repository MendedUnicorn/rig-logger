import { configureStore } from '@reduxjs/toolkit';
import tripReducer from '../slices/tripsSlice';
import optionsReducer from '../slices/optionsSlice';
import filtersSlice from '../slices/filtersSlice';

export default configureStore({
  reducer: {
    trips: tripReducer,
    options: optionsReducer,
    filters: filtersSlice,
  },
});
