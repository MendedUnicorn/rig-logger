import { createSlice } from '@reduxjs/toolkit';

export const tripsSlice = createSlice({
  name: 'trips',
  initialState: [],
  reducers: {
    setTrips: (state, action) => {
      return action.payload;
    },
    addTrip: (state, action) => {
      return [...state, action.payload];
    },
    removeTrip: (state, action) => {
      return state.filter((trip) => trip.id !== action.id);
    },
  },
});

export const { addTrip } = tripsSlice.actions;

export const setAllTrips = () => (dispatch) => {
  const res = JSON.parse(localStorage.getItem('trips'));
  dispatch(tripsSlice.actions.setTrips(res));
};

export const selectTrips = (state) => state.trips;

export default tripsSlice.reducer;
