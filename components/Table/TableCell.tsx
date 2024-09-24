import { PropsWithChildren } from "react";

const TableCell = ({ children }: PropsWithChildren) => (
  <td className="p-4 text-center whitespace-nowrap">{children}</td>
);

export default TableCell;
