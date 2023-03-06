import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { Delete24Regular } from "@fluentui/react-icons";

function ColleaguesTableView(props) {
  const items = props.colleagues ? props.colleagues : [];
  const columns = [
    createTableColumn({
      columnId: "colleague",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Colleague",
      renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "position",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Position",
      renderCell: (item) => <TableCellLayout>{item.position}</TableCellLayout>,
    }),

    createTableColumn({
      columnId: "remove",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Remove",
      renderCell: (item) => (
        <Button
          icon={<Delete24Regular />}
          onClick={() => props.handleRemoveColleague(item.name)}
          appearance="subtle"
        ></Button>
      ),
    }),
  ];
  const columnsViewOnly = [
    createTableColumn({
      columnId: "colleague",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Colleague",
      renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "position",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Position",
      renderCell: (item) => <TableCellLayout>{item.position}</TableCellLayout>,
    }),
  ];

  return (
    <DataGrid
      items={items}
      columns={props.viewOnly ? columnsViewOnly : columns}
      resizableColumns
      columnSizingOptions={{
        colleague: {
          minWidth: 100,
          defaultWidth: props.viewOnly ? "70%" : "20%",
          idealWidth: props.viewOnly ? "70%" : "20%",
        },
        position: {
          defaultWidth: props.viewOnly ? "30%" : "65%",
          minWidth: 60,
          idealWidth: props.viewOnly ? "30%" : "65%",
        },

        remove: {
          minWidth: 40,
          defaultWidth: "15%",
          idealWidth: "15%",
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
  );
}

export default ColleaguesTableView;
