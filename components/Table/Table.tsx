import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ITable extends PropsWithChildren {
  classes?: string;
  wrapperClasses?: string;
}

const Table = ({ children, classes, wrapperClasses }: ITable) => (
  <div
    className={clsx("block overflow-auto whitespace-nowrap", wrapperClasses)}
    style={{ maxHeight: "calc(100vh - 64px)" }}
  >
    <table className={clsx("table-auto w-full relative", classes)}>
      {children}
    </table>
  </div>
);

export default Table;
