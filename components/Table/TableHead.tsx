import { PropsWithChildren } from "react";

const TableHead = ({ children }: PropsWithChildren) => (
  <th className="p-4 text-center">{children}</th>
);

export default TableHead;
