import { createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const initialState = {
  rigs: [],
  operators: [],
  contractors: [],
  fsms: [],
  des: [],
  colleagues: [],
  tools: [],
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptions: (state, action) => {
      return { ...state, ...action.payload };
    },
    addOption: (state, action) => {
      console.log('state', state);
      return {
        ...state,
        [action.payload.category]: [
          ...state[action.payload.category],
          action.payload.data,
        ],
      };
    },
  },
});

export const startSetOptions = (col) => async (dispatch) => {
  const snap = await getDocs(collection(db, col));
  const newOptions = [];
  snap.forEach((op) => {
    newOptions.push(op.data());
  });
  dispatch(optionsSlice.actions.setOptions({ [col]: newOptions }));
};

export const startAddOption = (optCategory, opt) => async (dispatch) => {
  const docRef = await addDoc(collection(db, optCategory), opt);
  dispatch(
    optionsSlice.actions.addOption({ category: optCategory, data: opt })
  );
};

export default optionsSlice.reducer;
