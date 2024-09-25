import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ITableHeadCell extends PropsWithChildren {
  classes?: string;
}

const TableHeadCell = ({ children, classes }: ITableHeadCell) => (
  <th className={clsx("p-4 text-center", classes)}>{children}</th>
);

export default TableHeadCell;
