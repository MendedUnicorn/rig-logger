import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const changeFieldName = async () => {
  const newDocs = [];
  const docs = await getDocs(collection(db, 'trips'));
  docs.forEach(async (d) => {
    let dp = d.data();
    if (dp.colleague) {
      dp.colleagues = dp.colleague;
      delete dp.colleague;
      await deleteDoc(doc(db, 'trips', d.id));
      await addDoc(collection(db, 'trips'), dp);
    }
  });
};

export const fix = async () => {
  const docRef = await getDocs(collection(db, 'trips'));
  docRef.forEach(async (document) => {
    const useableData = document.data();
    if (useableData.dp) {
      await deleteDoc(doc(db, 'trips', document.id));
      await addDoc(collection(db, 'trips'), useableData.dp);
    }
  });
};
