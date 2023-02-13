import { createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

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
      return state.filter((trip) => trip.id !== action.payload);
    },
  },
});

export const { addTrip } = tripsSlice.actions;

export const setAllTrips = () => async (dispatch) => {
  const snap = await getDocs(collection(db, 'trips'));
  const trips = [];
  snap.forEach((trip) => trips.push({ ...trip.data(), id: trip.id }));
  dispatch(tripsSlice.actions.setTrips(trips));
};
export const startAddTrip = (trip) => async (dispatch) => {
  const docRef = await addDoc(collection(db, 'trips'), trip);
  dispatch(tripsSlice.actions.addTrip({ ...trip, id: docRef.id }));
};
export const startRemoveTrip = (id) => async (dispatch) => {
  await deleteDoc(doc(db, 'trips', id));
  dispatch(tripsSlice.actions.removeTrip(id));
};

export default tripsSlice.reducer;

// remove later -- testing

// clean this up - a selector - filter for finding trips with  more than so and so many days
