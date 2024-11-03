import clsx from "clsx";
import { PropsWithChildren } from "react";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeadCell from "./TableHeadCell";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface Props extends PropsWithChildren {
  classes?: string;
  wrapperClasses?: string;
  autoHeight?: boolean;
}

const Table = ({
  children,
  classes,
  wrapperClasses,
  autoHeight = false,
}: Props) => (
  <div
    className={clsx("block overflow-auto whitespace-nowrap", wrapperClasses)}
    style={autoHeight ? {} : { maxHeight: "calc(100vh - 76px)" }}
  >
    <table className={clsx("table-auto w-full relative", classes)}>
      {children}
    </table>
  </div>
);

export default Table;
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeader,
  TableRow,
};
