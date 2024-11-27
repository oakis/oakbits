import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  index: number;
  classes?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

const TableRow = ({
  children,
  classes,
  index,
  primaryColor,
  secondaryColor,
}: Props) => {
  return (
    <tr
      className={clsx(
        "border",
        classes,
        (index % 2 === 0 && primaryColor) ?? "bg-slate-100",
        index % 2 !== 0 && secondaryColor && secondaryColor
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
