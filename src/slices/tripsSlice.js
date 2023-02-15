import { createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const tripsSlice = createSlice({
  name: 'trips',
  initialState: [],
  reducers: {
    setTrips: (state, action) => {
      console.log('s', state);
      return action.payload;
    },
    addTrip: (state, action) => {
      return [...state, action.payload];
    },
    removeTrip: (state, action) => {
      return state.filter((trip) => trip.id !== action.payload);
    },
    updateTrip: (state, action) => {
      const trips = state.map((trip) => {
        if (trip.id === action.payload.id) {
          return action.payload.update;
        }
        return trip;
      });
      return trips;
    },
  },
});

export const { addTrip, removeTrip, updateTrip } = tripsSlice.actions;

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

export const startUpdateTrip = (id, update) => async (dispatch) => {
  console.log('id', id);
  await updateDoc(doc(db, 'trips', id), update);
  dispatch(
    tripsSlice.actions.updateTrip({ id, update: { ...update, id: id } })
  );
};

export default tripsSlice.reducer;

// remove later -- testing

// clean this up - a selector - filter for finding trips with  more than so and so many days
