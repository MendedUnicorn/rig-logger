import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  makeStyles,
  TableCellLayout,
  tokens,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { Delete24Regular } from "@fluentui/react-icons";

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

function RunTableView(props) {
  const items = props && props.runs;
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

  const columns = [
    createTableColumn({
      columnId: "run",
      compare: (a, b) => {
        return a.run.localCompare(b.run);
      },
      renderHeaderCell: () => "Run",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.run}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "section",
      compare: (a, b) => {
        return a.section.localCompare(b.section);
      },
      renderHeaderCell: () => "Section",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.section} in.</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "bha",
      compare: (a, b) => {
        return a.bha.localCompare(b.bha);
      },
      renderHeaderCell: () => "BHA",
      renderCell: (item) => (
        <TableCellLayout truncate>
          <ul className={styles.tagsList}>
            {item.bha.map((tool) => Tag(tool))}
          </ul>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "remove",
      compare: (a, b) => {
        return a.name.localCompare(b.name);
      },
      renderHeaderCell: () => "Remove",
      renderCell: (item) => (
        <TableCellLayout>
          <Button
            icon={<Delete24Regular />}
            onClick={() => {
              console.log(item);
              props.handleRemoveRun(item.run);
            }}
            appearance="subtle"
          ></Button>
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <DataGrid
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
        run: {
          minWidth: 40,
          defaultWidth: "7%",
          idealWidth: "7%",
        },
        section: {
          defaultWidth: "13%",
          minWidth: 60,
          idealWidth: "13%",
        },
        bha: {
          minWidth: 300,
          defaultWidth: "65%",
          idealWidth: "65%",
        },
        remove: {
          minWidth: 40,
          defaultWidth: "15%",
          idealWidth: 50,
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

export default RunTableView;
