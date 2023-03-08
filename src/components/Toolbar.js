import {
  ToolbarToggleButton,
  Tooltip,
  Toolbar,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
} from "@fluentui/react-components";
import {} from "@fluentui/react-components";
import React, { useState } from "react";

import { ReactComponent as OilRigIcon2 } from "../assets/oil-platform-2.svg";
import { ReactComponent as WorkerIcon } from "../assets/worker.svg";
import { ReactComponent as CompanyManIcon } from "../assets/companyman.svg";
import { ReactComponent as FsmIcon } from "../assets/fsm.svg";
import { ReactComponent as DeIcon } from "../assets/de.svg";
import { ReactComponent as ColleagueIcon } from "../assets/colleague.svg";
import { ReactComponent as PositionIcon } from "../assets/position.svg";
import { ReactComponent as ToolIcon } from "../assets/tool.svg";
import AddNewOption from "./AddNewOption";
import NewOptionInput from "./NewOptionInput";
import ToolbarButton from "./ToolbarButton";

const useStyle = makeStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "#fafafa",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "5px",
  },
});

function ToolbarOptions() {
  const styles = useStyle();

  return (
    <div>
      <Toolbar className={styles.root}>
        <ToolbarButton title="Rig" type="rigs" icon={<OilRigIcon2 />} />
        <ToolbarButton
          title="Operator"
          type="operators"
          icon={<CompanyManIcon />}
        />
        <ToolbarButton
          title="Contractor"
          type="contractors"
          icon={<WorkerIcon />}
        />
        <ToolbarButton title="FSM" type="fsms" icon={<FsmIcon />} />
        <ToolbarButton title="DE" type="des" icon={<DeIcon />} />
        <ToolbarButton
          title="Colleague"
          type="colleagues"
          icon={<ColleagueIcon />}
        />
        <ToolbarButton
          title="Position"
          type="positions"
          icon={<PositionIcon />}
        />
        <ToolbarButton title="Tool" type="tools" icon={<ToolIcon />} />
      </Toolbar>
    </div>
  );
}

export default ToolbarOptions;
