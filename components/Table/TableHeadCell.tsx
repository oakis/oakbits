import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
  colSpan?: number;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}

const TableHeadCell = ({ children, classes, colSpan, onClick }: Props) => (
  <th
    colSpan={colSpan}
    className={clsx(
      "p-2 sm:p-4 text-center text-nowrap",
      classes,
      onClick && "cursor-pointer"
    )}
    onClick={onClick}
  >
    {children}
  </th>
);

export default TableHeadCell;
