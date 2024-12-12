import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
  rowSpan?: number;
  colSpan?: number;
}

const TableCell = ({ children, classes, rowSpan, colSpan }: Props) => (
  <td
    rowSpan={rowSpan}
    colSpan={colSpan}
    className={clsx("h-14 px-2 sm:px-4 text-center whitespace-nowrap", classes)}
  >
    {children}
  </td>
);

export default TableCell;
