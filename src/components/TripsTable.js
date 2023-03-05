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
import { Delete24Regular } from "@fluentui/react-icons";
import { DateTime } from "luxon";
import React from "react";
import { ReactComponent as RigIcon } from "../assets/oilrig.svg";
import OilrigLogo from "../assets/OilrigLogo";

function TripsTable(props) {
  const items = props.trips;

  const columns = [
    createTableColumn({
      columnId: "rig",
      compare: (a, b) => {
        return a.run.localCompare(b.run);
      },
      renderHeaderCell: () => "Rig",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.rig}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "operator",
      compare: (a, b) => {
        return a.section.localCompare(b.section);
      },
      renderHeaderCell: () => "Operator",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.operator}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "contractor",
      compare: (a, b) => {
        return a.bha.localCompare(b.bha);
      },
      renderHeaderCell: () => "Contractor",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.contractor}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "from",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "From",
      renderCell: (item) => (
        <TableCellLayout
          style={{
            right: 0,
            position: "absolute",
          }}
        >
          {DateTime.fromISO(item.dateFrom).toFormat("dd LLL yy")}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "to",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "To",
      renderCell: (item) => (
        <TableCellLayout
          style={{
            right: 0,
            position: "absolute",
          }}
        >
          {DateTime.fromISO(item.dateTo).toFormat("dd LLL yy")}
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <DataGrid
      className="trip-table"
      items={items}
      columns={columns}
      resizableColumns
      getRowId={(item) => item.run}
      // onColumnResize={(event, { columnId, width }) => {
      //   if (event instanceof MouseEvent) {
      //     console.log(event.offsetX, event.offsetY, columnId, width);
      //   }
      // }}

      columnSizingOptions={{
        rig: {
          minWidth: 40,
          defaultWidth: "25%",
          idealWidth: "25%",
        },
        operator: {
          defaultWidth: "25%",
          minWidth: 60,
          idealWidth: "25%",
        },
        contractor: {
          minWidth: 40,
          defaultWidth: "20%",
          idealWidth: "20%",
        },
        from: {
          minWidth: 40,
          defaultWidth: "15%",
          idealWidth: "15%",
        },
        to: {
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
<a href="https://www.vecteezy.com/free-vector/oil-rig">
  Oil Rig Vectors by Vecteezy
</a>;
export default TripsTable;
