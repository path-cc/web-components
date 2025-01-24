import { ReactElement, useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { TableProps } from "../types";

const Table = ({
  headers,
  data,
  footerData = [],
  cellRenderer = (x) => x.toLocaleString(),
  containerSx,
  tableSx,
  headSx,
  headRowSx,
  headCellSx,
  bodyRowSx,
  bodySx,
  bodyCellSx,
  footerSx,
  footerRowSx,
  footerCellSx,
  sortable = false,
  defaultSortDirection = "asc",
  defaultSortColumn = 0,
  pagination = false,
  pageSize = -1,
  rowsPerPageOptions = [],
}: TableProps) => {
  const [page, setPage] = useState(0);
  // -1 rows per page means show all rows
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  // Default to ascending order
  const [order, setOrder] = useState<"asc" | "desc">(defaultSortDirection);

  // Default to first column for immediate sorting
  const [orderBy, setOrderBy] = useState(
    typeof defaultSortColumn === "number"
      ? defaultSortColumn
      : headers.indexOf(defaultSortColumn)
  );

  // We keep track of this because we want to show the sort direction only if
  // the user has interacted with the sorting.
  const [interactedWithSort, setInteractedWithSort] = useState(false);

  const handleSort = (columnIndex: number) => {
    const isAsc = orderBy === columnIndex && order === "asc";
    setInteractedWithSort(true);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnIndex);
    // Reset page because we're changing the sorting and it would be weird to
    // see random data
    setPage(0);
  };

  const handlePageChange = (_event: React.MouseEvent | null, page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // Reset page because we're changing the number of rows per page
    // and it would be weird to see random data
    setPage(0);
  };

  const formatFooterCell = (data: string | number | ReactElement) => {
    if (typeof data === "number") {
      return <span>{data.toLocaleString()}</span>;
    } else if (typeof data === "string") {
      return <span>{data}</span>;
    } else {
      return data;
    }
  };

  const sortedData = !sortable
    ? data
    : data.sort((a: (string | number)[], b: (string | number)[]) => {
        const aCell = a[orderBy];
        const bCell = b[orderBy];

        if (typeof aCell === "string" && typeof bCell === "string") {
          return order === "asc"
            ? aCell.localeCompare(bCell)
            : bCell.localeCompare(aCell);
        } else if (typeof aCell === "number" && typeof bCell === "number") {
          return order === "asc" ? aCell - bCell : bCell - aCell;
        } else {
          throw new Error("Cannot compare different types");
        }
      });

  return (
    <TableContainer sx={containerSx}>
      <MUITable sx={{ ...tableSx }} stickyHeader>
        <TableHead sx={headSx}>
          <TableRow sx={headRowSx}>
            {headers.map((header, i) => (
              // column headers
              <TableCell key={i} sx={headCellSx}>
                {!sortable ? (
                  <span>{header}</span>
                ) : (
                  <TableSortLabel
                    active={interactedWithSort ? orderBy === i : false}
                    direction={order}
                    onClick={() => handleSort(i)}
                  >
                    <span>{header}</span>
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: "auto", ...bodySx }}>
          {
            // data rows
            (!pagination
              ? sortedData
              : sortedData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
            ).map((row, i) => (
              <TableRow key={i} sx={bodyRowSx}>
                {row.map((cell, j) => (
                  <TableCell key={j} sx={bodyCellSx}>
                    {cellRenderer(cell, headers[j], j, i)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
          <TableRow sx={footerRowSx}>
            {footerData.map((cell, i) => (
              // footer cells
              <TableCell key={i} sx={footerCellSx}>
                {formatFooterCell(cell)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
        <TableFooter sx={footerSx}>
          {
            // real footer (which is sticky and contains pagination)
            pagination && (
              <TablePagination
                count={data.length}
                onPageChange={handlePageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                showFirstButton
                showLastButton
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )
          }
        </TableFooter>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
