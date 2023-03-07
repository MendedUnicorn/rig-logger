import {
  Button,
  Label,
  radioGroupClassNames,
} from "@fluentui/react-components";
import { ArrowUpload24Regular } from "@fluentui/react-icons";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { processCSV } from "../helpers/importFromMinDawinci";
import { selectOptions } from "../selectors/optionsSelectors";
import { startAddOption } from "../slices/optionsSlice";

const ImportFromDawinci = () => {
  const [file, setFile] = useState("null");
  const rigs = useSelector(selectOptions("rigs"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const csv = file;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const trips = processCSV(text);
      trips.map(async (trip) => {
        const docRef = await addDoc(collection(db, "trips"), trip);
      });
      await trips.map(async (trip) => {
        if (!rigs.some((rig) => rig.name === trip.rig)) {
          await dispatch(startAddOption("rigs", { name: trip.rig }));
          console.log("added new rig", trip.rig);
        } else {
          console.log("not addaed ", trip.rig);
        }
      });
      navigate("/trips");
    };
    reader.readAsText(file);
  };

  return (
    <div className="import-from-dawinci-container">
      <Button icon={<ArrowUpload24Regular />}>
        <label htmlFor="file">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />
          Upload File
        </label>
      </Button>
      <p className="import-from-dawinci__filename">{file.name}</p>
      <Button appearance="primary" onClick={() => handleSubmit(file)}>
        Import from MinDawinci
      </Button>
    </div>
  );
};

export default ImportFromDawinci;
