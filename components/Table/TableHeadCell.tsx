import { PropsWithChildren } from "react";

const TableHeadCell = ({ children }: PropsWithChildren) => (
  <th className="p-4 text-center">{children}</th>
);

export default TableHeadCell;
