import { Checkbox } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

function CheckBoxGroup({ handleChangeCheckbox }) {
  const [mwd, setMwd] = useState(false);
  const [dd, setDd] = useState(false);
  const [jpg, setJpg] = useState(false);
  const [seismic, setSeismic] = useState(false);

  useEffect(() => {
    handleChangeCheckbox(mwd, dd, jpg, seismic);
  }, [mwd, dd, jpg, seismic]);

  return (
    <div>
      <Checkbox
        checked={mwd}
        onChange={() => setMwd((checked) => !checked)}
        label="MWD"
      />
      <Checkbox
        checked={dd}
        onChange={() => setDd((checked) => !checked)}
        label="DD"
      />
      <Checkbox
        checked={jpg}
        onChange={() => setJpg((checked) => !checked)}
        label="JPEG Engineer"
      />
      <Checkbox
        checked={seismic}
        onChange={(checked) => setSeismic((checked) => !checked)}
        label="Seismic Engineer"
      />
    </div>
  );
}

export default CheckBoxGroup;
