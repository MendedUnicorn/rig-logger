import { configureStore } from '@reduxjs/toolkit';
import tripReducer from '../slices/tripsSlice';

export default configureStore({
  reducer: {
    trips: tripReducer,
  },
});
