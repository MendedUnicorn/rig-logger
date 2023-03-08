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

const GetRigs = () => {
  const [file, setFile] = useState("null");
  const rigs = useSelector(selectOptions("rigs"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldTrips = useSelector((state) => state.trips);
  const handleSubmit = () => {
    const csv = file;
    const reader = new FileReader();

    const data = {};
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\r\n");

      lines.map((line) => {
        const d = line.split(",");
        data[d[0]] = d[1];
      });
    };
    console.log(data);
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
        Load some rigs
      </Button>
    </div>
  );
};

export default GetRigs;
