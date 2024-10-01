import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ITableHead extends PropsWithChildren {
  classes?: string;
}

const TableHead = ({ children, classes }: ITableHead) => (
  <thead className={clsx(classes)}>{children}</thead>
);

export default TableHead;
