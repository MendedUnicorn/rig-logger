import {
  Button,
  Label,
  radioGroupClassNames,
} from "@fluentui/react-components";
import { ArrowUpload24Regular } from "@fluentui/react-icons";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { processCSV } from "../helpers/importFromMinDawinci";
import { selectOptions } from "../selectors/optionsSelectors";
import { startAddOption } from "../slices/optionsSlice";
import { checkTripOverlap } from "../helpers/dateValidation";

const ImportFromDawinci = () => {
  const [file, setFile] = useState("null");
  const rigs = useSelector(selectOptions("rigs"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldTrips = useSelector((state) => state.trips);
  const handleSubmit = () => {
    const csv = file;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const trips = processCSV(text);
      trips.map(async (trip) => {
        if (!checkTripOverlap(trip, oldTrips)) {
          // change to dispatch so store updates too
          const docRef = await addDoc(collection(db, "trips"), trip);
        } else {
          console.log("trip already exists", trip.rig, trip);
        }
      });
      // Load any non existent rigs as options
      const uniqueRigs = [...new Set(trips.map((trip) => trip.rig))]; //removes any duplicate rigs from the trips imported
      console.log(uniqueRigs, "unique rigs");
      await uniqueRigs.map(async (rigName) => {
        if (!rigs.some((rig) => rig.name === rigName)) {
          await dispatch(startAddOption("rigs", { name: rigName }));
          console.log("added new rig to options", rigName);
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
          Chose a file..
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
