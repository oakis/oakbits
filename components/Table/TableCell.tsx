import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ITableCell extends PropsWithChildren {
  classes?: string;
  rowSpan?: number;
}

const TableCell = ({ children, classes, rowSpan }: ITableCell) => (
  <td
    rowSpan={rowSpan}
    className={clsx("h-14 px-4 text-center whitespace-nowrap", classes)}
  >
    {children}
  </td>
);

export default TableCell;
