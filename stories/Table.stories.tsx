import { Box, SxProps } from "@mui/material";
import Table from "../src/Table";
import { defaultTableData } from "./mockData/Table";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "Components/Data/Table",
  component: (args) => {
    return <Table {...args} />;
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultTableData,
};

export const Sortable: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    ...defaultTableData,
  },
};

export const Checkered: Story = {
  args: {
    bodyRowSx: {
      "&:nth-of-type(odd)": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      },
    },
    ...defaultTableData,
  },
};

export const Link: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    cellRenderer: (cell, _header, column, _row) => {
      if (column === 0) {
        return <a href={`https://www.google.com/search?q=${cell}`}>{cell}</a>;
      }
      return cell.toLocaleString();
    },
    ...defaultTableData,
  },
};

export const WithHeight: Story = {
  args: {
    containerSx: {
      height: 400,
    },
    ...defaultTableData,
  },
};

export const IndividualCellBorders: Story = {
  args: {
    bodyCellSx: {
      border: {
        "&:first-child": {
          borderLeft: "1px solid rgba(224, 224, 224, 1)",
        },
        "&:last-child": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
        "&:not(:last-child)": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
      },
    },
    ...defaultTableData,
  },
};

export const Empty: Story = {
  args: {
    headers: ["Column 1", "Column 2", "Column 3", "Column 4"],
    data: [],
  },
};

export const Pagination: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
    },
    pagination: true,
    pageSize: 10,
    ...defaultTableData,
  },
};

export const HeightAndPagination: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
      height: 300,
    },
    pagination: true,
    pageSize: 10,
    ...defaultTableData,
  },
};

export const CustomPagination: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
    },
    pagination: true,
    pageSize: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
    ...defaultTableData,
  },
};

const fullStyleThinBorder = "1px solid rgb(138, 138, 138, 0.2)";
const fullStyleThickBorder = "1px solid rgb(0, 0, 0)";

export const FullStyle: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    headCellSx: {
      ...borderHelper(fullStyleThinBorder, fullStyleThinBorder, "0.5rem"),
      bgcolor: "#f5f5f5",
      borderTop: fullStyleThinBorder,
      borderBottom: fullStyleThickBorder,
      fontWeight: "bold",
    },
    footerCellSx: {
      bgcolor: "#f5f5f5",
      borderTop: fullStyleThickBorder,
      borderBottom: fullStyleThickBorder,
      ...borderHelper(fullStyleThinBorder, fullStyleThinBorder, "", "0.5rem"),
      fontWeight: "bold",
    },
    bodyCellSx: {
      borderBottom: fullStyleThinBorder,
      ...borderHelper(fullStyleThinBorder, fullStyleThinBorder),
    },
    footerData: [
      <Box display="flex" justifyContent="space-between">
        <span>Summary Statistics:</span>
        <span>73</span>
      </Box>,
      218_807_151,
      57,
      196,
    ],
    headers: defaultTableData.headers,
    data: defaultTableData.data,
  },
};

function borderHelper(
  outer: string,
  inner: string,
  radiusTop?: string,
  radiusBottom?: string
): SxProps {
  return {
    borderTop: inner,
    borderBottom: inner,
    "&:first-child": {
      borderLeft: outer,
      borderTopLeftRadius: radiusTop,
      borderBottomLeftRadius: radiusBottom,
    },
    "&:last-child": {
      borderRight: outer,
      borderTopRightRadius: radiusTop,
      borderBottomRightRadius: radiusBottom,
    },
    "&:not(:last-child)": {
      borderRight: inner,
    },
  };
}
