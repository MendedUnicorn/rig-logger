import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
  makeStyles,
  TableCellLayout,
} from "@fluentui/react-components";
import { CalendarLtr24Regular } from "@fluentui/react-icons";
import { DateTime } from "luxon";
import React, { useState } from "react";

import { ReactComponent as OilRigIcon } from "../assets/oil-platform.svg";
import { ReactComponent as OilRigIcon2 } from "../assets/oil-platform-2.svg";
import { ReactComponent as WorkerIcon } from "../assets/worker.svg";
import { ReactComponent as CompanyManIcon } from "../assets/companyman.svg";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";

const useStyle = makeStyles({
  root: {},
});

function TripsTable(props) {
  const items = props.trips;
  const styles = useStyle();

  const columns = [
    createTableColumn({
      columnId: "rig",
      compare: (a, b) => {
        return a.run.localCompare(b.run);
      },
      renderHeaderCell: () => {
        return (
          <p
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            Rig <OilRigIcon2 height={"20px"} width="20px" />
          </p>
        );
      },
      renderCell: (item) => (
        <TableCellLayout truncate>{item.rig}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "operator",
      compare: (a, b) => {
        return a.section.localCompare(b.section);
      },
      renderHeaderCell: () => (
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          Operator <CompanyManIcon height={"20px"} width="20px" />
        </p>
      ),
      renderCell: (item) => (
        <TableCellLayout truncate>{item.operator}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "contractor",
      compare: (a, b) => {
        return a.bha.localCompare(b.bha);
      },
      renderHeaderCell: () => (
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          Contractor <WorkerIcon height={"20px"} width="20px" />
        </p>
      ),
      renderCell: (item) => (
        <TableCellLayout truncate>{item.contractor}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "from",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => (
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          From <CalendarLtr24Regular />
        </p>
      ),
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
      renderHeaderCell: () => (
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          To <CalendarLtr24Regular />
        </p>
      ),
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
    <div className="trip-table">
      <DataGrid
        className={styles.root}
        items={items}
        columns={columns}
        resizableColumns
        getRowId={(item) => item.id}
        // onSelectionChange={(e, d) => {
        //   console.log("yo", e, d.selectedItems.values().next().value);
        //   console.log("yao", e, d.selectedItems);
        //   const item = items.filter(
        //     (item) => item.id === d.selectedItems.values().next().value
        //   );
        //   setModalData(item[0]);
        //   setModalOpen((prev) => !prev);

        //   //   setModalOpen((prev) => !prev);
        // }}
        // selectionMode="single"
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
          <DialogTrigger action="open">
            <DataGridRow onClick={() => console.log("ffwef")}>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DialogTrigger>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow
              id={item.id}
              key={rowId}
              appearance="none"
              onClick={(e, d) => {
                let search = true;
                console.log(e.target.parentElement);
                let counter = 0;
                let el = e.target;
                while (true) {
                  if (counter > 20) {
                    break;
                  }
                  console.log(counter);

                  if (el.id) {
                    console.log("im a row fucker", el.id);
                    props.setModalOpen((prev) => !prev);
                    props.setModalData(
                      items.filter((item) => item.id === el.id)[0]
                    );
                    break;
                  } else {
                    el = el.parentElement;
                    counter++;
                  }
                }
              }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}
<a href="https://www.vecteezy.com/free-vector/oil-rig">
  Oil Rig Vectors by Vecteezy
</a>;
export default TripsTable;
