import {
  Button,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  TableCellLayout,
} from "@fluentui/react-components";
import { Edit24Regular } from "@fluentui/react-icons";
import React, { useState } from "react";

function OptionElementV2(props) {
  const [showEditInput, setShowEditInput] = useState(false);
  return (
    <div>
      <TableCellLayout truncate>
        <Button
          onClick={() => props.setEditItem(props.item)}
          icon={<Edit24Regular />}
        ></Button>
      </TableCellLayout>
    </div>
  );
}

export default OptionElementV2;
