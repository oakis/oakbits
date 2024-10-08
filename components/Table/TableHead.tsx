import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
}

const TableHead = ({ children, classes }: Props) => (
  <thead className={clsx(classes)}>{children}</thead>
);

export default TableHead;
