import { SxProps } from "@mui/material";
import { ReactElement } from "react";

/**
 * Article Types
 */

export interface ArticleCardProps {
  href: string;
  article: BackendArticle;
}

type website = "htcondor" | "path" | "osg" | "chtc" | "pelican";
type tag = "chtc_featured_article";
type article_type = "news" | "user";

export interface Image {
  path: string;
  alt: string;
}

export interface Article {
  content: string;
  title: string;
  author: string;
  date: Date;
  publish_on: website[];
  type: article_type;
  tag: tag;
  image: Image;
  excerpt: string;
  banner_src: string;
  banner_alt: string;
}

export interface BackendArticle extends Article {
  slug: string[];
  path: string;
}

/**
 * Pie Chart Types
 */

export interface PieChartData {
  showLegend?: boolean;
  bgColor?: string;
  textColor?: string;

  sortData?: boolean;
  axisLabel: string;
  data: {
    label: string;
    value: number;
  }[];
}

/**
 * Table Types
 */

export interface TableProps {
  /**
   * The headers of the table.
   */
  headers: string[];
  /**
   * The data of the table.
   *
   * Each element in the array is a row, and each row contains cells of strings
   * or numbers.
   */
  data: (string | number)[][];
  /**
   * The footer data that appears at the bottom of the table.
   *
   * This data is not sorted or paginated, and can include normal React elements.
   */
  footerData?: (string | number | ReactElement)[];

  /**
   * A function that takes in a cell, the column header, the column index, and
   * the row index and returns the inner component of the cell to render.
   *
   * If the footer is not a React element, it will also be passed to this
   * function.
   */
  cellRenderer?: (
    cell: string | number,
    columnHeader: string,
    column: number,
    row: number
  ) => React.ReactNode;

  containerSx?: SxProps;
  tableSx?: SxProps;

  headSx?: SxProps;
  headRowSx?: SxProps;
  headCellSx?: SxProps;

  footerSx?: SxProps;
  footerRowSx?: SxProps;
  footerCellSx?: SxProps;

  bodySx?: SxProps;
  bodyRowSx?: SxProps;
  bodyCellSx?: SxProps;

  /**
   * Whether or not the table is sortable. False by default.
   */
  sortable?: boolean;
  /**
   * Sort direction of the table. Ascending by default.
   */
  defaultSortDirection?: "asc" | "desc";
  /**
   * The default column to sort by. The first column by default.
   */
  defaultSortColumn?: string;

  /**
   * Whether or not the table is paginated. False by default.
   */
  pagination?: boolean;
  /**
   * The number of rows per page. 10 by default.
   */
  pageSize?: number;
  /**
   * The options for the number of rows per page. No options (empty array) by
   * default.
   */
  rowsPerPageOptions?: number[];
}
