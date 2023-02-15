import { createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const initialState = {
  rigs: [],
  operators: [],
  contractors: [],
  fsms: [],
  des: [],
  positions: [],
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
      return {
        ...state,
        [action.payload.category]: [
          ...state[action.payload.category],
          action.payload.data,
        ],
      };
    },
    removeOption: (state, action) => {
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].filter(
          (opt) => opt.id !== action.payload.id
        ),
      };
    },
    editOption: (state, action) => {
      const index = state[action.payload.category].findIndex(
        (opt) => opt.id === action.payload.id
      );
      const original = state[action.payload.category][index];
      state[action.payload.category][index] = {
        ...original,
        ...action.payload.data,
      };
    },
  },
});

export const startSetOptions = (col) => async (dispatch) => {
  const snap = await getDocs(collection(db, col));
  const newOptions = [];
  snap.forEach((op) => {
    newOptions.push({ ...op.data(), id: op.id });
  });
  dispatch(optionsSlice.actions.setOptions({ [col]: newOptions }));
};

export const startAddOption = (category, opt) => async (dispatch) => {
  const docRef = await addDoc(collection(db, category), opt);
  dispatch(
    optionsSlice.actions.addOption({
      category,
      data: { ...opt, id: docRef.id },
    })
  );
};

export const startRemoveOption = (category, id) => async (dispatch) => {
  const docRef = await deleteDoc(doc(db, category, id));
  console.log('deleted');
  dispatch(optionsSlice.actions.removeOption({ category, id }));
};

export const startEditOption = (category, id, data) => async (dispatch) => {
  const docRef = await updateDoc(doc(db, category, id), data);
  console.log('updates: ', docRef);
  dispatch(optionsSlice.actions.editOption({ category, id, data }));
};

export const { editOption } = optionsSlice.actions;

export default optionsSlice.reducer;
