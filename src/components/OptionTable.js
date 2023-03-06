import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Input,
  makeStyles,
  TableCellLayout,
  tokens,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import {
  Delete24Regular,
  Edit24Regular,
  Save24Regular,
  DismissCircle24Regular,
} from "@fluentui/react-icons";
import OptionElementV2 from "./OptionElementV2";
import { useDispatch, useSelector } from "react-redux";
import { startEditOption } from "../slices/optionsSlice";
import OptionElementInput from "./OptionElementInput";
import { selectOptions } from "../selectors/optionsSelectors";
import NewOptionInput from "./NewOptionInput";
import OptionDelete from "./OptionDelete";

const useStyles = makeStyles({
  tagsList: {
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
    flexWrap: "wrap",
    paddingInlineStart: 0,
    // maxWidth: "250px",
  },
});

function OptionTable(props) {
  // const [items, setItems] = useState(props.data ? props.data : []);
  const [editItem, setEditItem] = useState();
  const [currentShowingName, setCurrentShowingName] = useState("");
  const [newOption, setNewOption] = useState("");

  const items = useSelector(selectOptions(props.type));
  // const items = [
  //   { run: "1", bha: ["ag", "gww"], section: "12.25" },
  //   { run: "2", bha: ["telescope", "arc"], section: "17.5" },
  // ];

  const styles = useStyles();

  const Tag = (tagName) => (
    <Button
      className={styles.tags}
      size="small"
      shape="circular"
      appearance="primary"
      iconPosition="after"
    >
      {tagName}
    </Button>
  );

  function cancelEdit() {
    setEditItem(false);
  }

  const columns = [
    createTableColumn({
      columnId: props.type,
      compare: (a, b) => {
        return a.run.localCompare(b.run);
      },
      renderHeaderCell: () => props.type,
      renderCell: (item) => (
        <TableCellLayout truncate>
          {editItem && item.id === editItem.id ? (
            <OptionElementInput
              name={item.name}
              type={props.type}
              id={item.id}
              cancelEdit={cancelEdit}
            />
          ) : (
            item.name
          )}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "edit",
      compare: (a, b) => {
        return a.section.localCompare(b.section);
      },
      renderHeaderCell: () => "Edit",
      renderCell: (item) => (
        <OptionElementV2 setEditItem={setEditItem} item={item} />
      ),
    }),
    createTableColumn({
      columnId: "delete",
      compare: (a, b) => {
        return a.bha.localCompare(b.bha);
      },
      renderHeaderCell: () => "Delete",
      renderCell: (item) => (
        <TableCellLayout truncate>
          <OptionDelete type={props.type} id={item.id} />
        </TableCellLayout>
      ),
    }),
  ];

  useEffect(() => {}, [editItem]);

  return (
    <>
      <NewOptionInput type={props.type} />
      <DataGrid
        items={items}
        columns={columns}
        resizableColumns
        getRowId={(item) => item.name}
        columnSizingOptions={{
          [props.type]: {
            minWidth: 40,
            defaultWidth: "80%",
            idealWidth: "80%",
          },
          edit: {
            defaultWidth: "10%",
            minWidth: 60,
            idealWidth: "10%",
          },
          delete: {
            minWidth: 60,
            defaultWidth: "10%",
            idealWidth: "10%",
          },
        }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
}

export default OptionTable;
