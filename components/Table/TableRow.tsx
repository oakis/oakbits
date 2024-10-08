import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  index: number;
  classes?: string;
}

const TableRow = ({ children, classes, index }: Props) => {
  return (
    <tr className={clsx("border", classes, index % 2 === 0 && "bg-slate-100")}>
      {children}
    </tr>
  );
};

export default TableRow;
