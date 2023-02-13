import { configureStore } from '@reduxjs/toolkit';
import tripReducer from '../slices/tripsSlice';
import optionsReducer from '../slices/optionsSlice';

export default configureStore({
  reducer: {
    trips: tripReducer,
    options: optionsReducer,
  },
});
