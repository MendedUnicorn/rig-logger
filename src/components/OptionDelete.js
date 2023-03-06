import React, { useState } from "react";
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
import { Delete24Regular } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import { startRemoveOption } from "../slices/optionsSlice";

function OptionDelete(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  function deleteOption() {
    dispatch(startRemoveOption(props.type, props.id));
  }

  return (
    <Dialog open={modalOpen}>
      <DialogTrigger disableButtonEnhancement>
        <Button
          onClick={() => setModalOpen(true)}
          icon={<Delete24Regular />}
        ></Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm deletio</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this option?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                onClick={() => setModalOpen(false)}
                appearance="secondary"
              >
                Close
              </Button>
            </DialogTrigger>
            <Button onClick={() => deleteOption()} appearance="primary">
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

export default OptionDelete;
