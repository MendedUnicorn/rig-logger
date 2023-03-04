import { Checkbox } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

function CheckBoxGroup({ handleChangeCheckbox, data }) {
  // const [mwd, setMwd] = useState(false);
  // const [dd, setDd] = useState(false);
  // const [jpg, setJpg] = useState(false);
  // const [seismic, setSeismic] = useState(false);
  const [workedAs, setWorkedAs] = useState([]);

  // useEffect(() => {
  //   // setWorkedAs(data)
  //   setMwd(workedAs.includes("mwd"));
  //   setDd(workedAs.includes("dd"));
  //   setJpg(workedAs.includes("jpg"));
  //   setSeismic(workedAs.includes("seismic"));
  // }, [workedAs]);
  useEffect(() => {
    setWorkedAs(data);
  }, [data]);

  // useEffect(() => {
  //   const arr = [];
  //   if (mwd) arr.push("mwd");
  //   if (dd) arr.push("dd");
  //   if (jpg) arr.push("jpg");
  //   if (seismic) arr.push("seismic");

  //   handleChangeCheckbox(arr);
  // }, [mwd, dd, jpg, seismic]);

  function handleChange(e, data, type) {
    if (data) {
      handleChangeCheckbox([...workedAs, type]);
    } else {
      handleChangeCheckbox(workedAs.filter((pos) => pos !== type));
    }
  }

  return (
    <div>
      <Checkbox
        checked={workedAs.includes("mwd")}
        onChange={(e, d) => handleChange(e, d, "mwd")}
        label="MWD"
      />
      <Checkbox
        checked={workedAs.includes("dd")}
        onChange={(e, d) => handleChange(e, d, "dd")}
        label="DD"
      />
      <Checkbox
        checked={workedAs.includes("jpg")}
        onChange={(e, d) => handleChange(e, d, "jpg")}
        label="JPEG Engineer"
      />
      <Checkbox
        checked={workedAs.includes("seismic")}
        onChange={(e, d) => handleChange(e, d, "seismic")}
        label="Seismic Engineer"
      />
    </div>
  );
}

export default CheckBoxGroup;
