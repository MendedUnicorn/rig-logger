import { Button, Input } from "@fluentui/react-components";
import { DismissCircle24Regular, Save24Regular } from "@fluentui/react-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOptions } from "../selectors/optionsSelectors";
import { startEditOption } from "../slices/optionsSlice";

function OptionElementInput(props) {
  const [inputValue, setInputValue] = useState(props.name);

  const dispatch = useDispatch();

  async function handleSaveEdit(id, data) {
    await dispatch(startEditOption(props.type, id, data));
    props.cancelEdit();
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input
        // onChange={(e, d) =>
        //   // setEditItem((prev) => ({ ...prev, name: d.value }))
        //   setCurrentShowingName(d.value)
        // }
        value={inputValue}
        onChange={(_, d) => setInputValue(d.value)}
      />
      <Button
        icon={<Save24Regular />}
        onClick={() => handleSaveEdit(props.id, { name: inputValue })}
      ></Button>

      <Button
        onClick={props.cancelEdit}
        icon={<DismissCircle24Regular />}
      ></Button>
    </div>
  );
}

export default OptionElementInput;
