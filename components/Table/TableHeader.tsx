import { PropsWithChildren } from "react";

const TableHeader = ({ children }: PropsWithChildren) => {
  return (
    <tr className="sticky top-0 bg-slate-600 text-slate-100">{children}</tr>
  );
};

export default TableHeader;
