import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@fluentui/react-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startAddOption } from "../slices/optionsSlice";

function NewOptionInput(props) {
  const [newOption, setNewOption] = useState("");
  const dispatch = useDispatch();
  function addNewOption() {
    dispatch(startAddOption(props.type, { name: newOption }));
    setNewOption("");
  }

  return (
    <div className="input-group">
      <Input
        value={newOption}
        placeholder={"Add new " + props.type}
        onChange={(_, d) => {
          setNewOption(d.value);
        }}
      />
      <Button onClick={() => addNewOption()}>Add</Button>
    </div>
  );
}

export default NewOptionInput;
