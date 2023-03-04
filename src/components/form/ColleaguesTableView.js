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
  const items = props && props.colleagues;
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

  return (
    <DataGrid
      items={items}
      columns={columns}
      resizableColumns
      columnSizingOptions={{
        colleague: {
          minWidth: 100,
          defaultWidth: "20%",
          idealWidth: "20%",
        },
        position: {
          defaultWidth: "65%",
          minWidth: 60,
          idealWidth: "65% ",
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
