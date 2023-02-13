// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  collectionGroup,
  getFirestore,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDyKi8FIXQ4bjr2fCOAGUSu_mrneVlAVYY',
  authDomain: 'rig-logger.firebaseapp.com',
  projectId: 'rig-logger',
  storageBucket: 'rig-logger.appspot.com',
  messagingSenderId: '638935196630',
  appId: '1:638935196630:web:d9f31d945fadce67d17a77',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addNewTrip = async (trip) => {
  try {
    const docRef = await addDoc(collection(db, 'trips'), trip);
    console.log('Data added ', docRef);
  } catch (e) {
    console.log(e);
  }
};
const addOptions = async (options, database) => {
  const docRef = await addDoc(collection(db, database), options);
  console.log('option added: ', docRef.id);
};

export { app, db, addNewTrip, addOptions };
