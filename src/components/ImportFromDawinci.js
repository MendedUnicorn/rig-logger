import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { processCSV } from '../helpers/importFromMinDawinci';

const ImportFromDawinci = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    const csv = file;
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const trips = processCSV(text);
      trips.map(async (trip) => {
        const docRef = await addDoc(collection(db, 'trips'), trip);
      });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type='file'
        name=''
        id=''
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={() => handleSubmit(file)}>Import from MinDawinci</button>
    </div>
  );
};

export default ImportFromDawinci;
