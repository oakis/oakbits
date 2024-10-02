import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ITableHeadCell extends PropsWithChildren {
  classes?: string;
  colSpan?: number;
}

const TableHeadCell = ({ children, classes, colSpan }: ITableHeadCell) => (
  <th colSpan={colSpan} className={clsx("p-4 text-center", classes)}>
    {children}
  </th>
);

export default TableHeadCell;
