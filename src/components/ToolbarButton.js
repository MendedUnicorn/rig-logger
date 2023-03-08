import React, { useState } from "react";

import {
  ToolbarToggleButton,
  PopoverTrigger,
  Popover,
  PopoverSurface,
  Button,
  ToolbarButton,
} from "@fluentui/react-components";

import AddNewOption from "./AddNewOption";
import NewOptionInput from "./NewOptionInput";

function ToolBarButton({ type, icon, title }) {
  const [open, setOpen] = useState();
  return (
    <Popover
      withArrow
      trapFocus
      open={open === type}
      onOpenChange={(_, data) => setOpen(data.open ? type : undefined)}
    >
      <PopoverTrigger disableButtonEnhancement>
        <ToolbarButton vertical aria-label="New" icon={icon}>
          {title}
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <h3>Add New {title}</h3>
          <NewOptionInput type={type} />
          <Button onClick={() => setOpen(undefined)}>Close</Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
}

export default ToolBarButton;
