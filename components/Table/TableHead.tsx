import { PropsWithChildren } from "react";

const TableHead = ({ children }: PropsWithChildren) => (
  <thead>{children}</thead>
);

export default TableHead;
