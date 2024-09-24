import { PropsWithChildren } from "react";

const Table = ({ children }: PropsWithChildren) => (
  <div
    className="block overflow-auto whitespace-nowrap"
    style={{ maxHeight: "calc(100vh - 64px)" }}
  >
    <table className="table-auto w-full relative">{children}</table>
  </div>
);

export default Table;
