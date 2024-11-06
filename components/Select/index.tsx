import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

interface Item {
  name: string;
  id: number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  items: Item[];
}

const Select = ({ onChange, value, items }: SelectProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={clsx(isMobile && "w-full px-4")}>
      <select
        value={value}
        onChange={onChange}
        className={clsx("px-2 py-1 rounded-md", isMobile && "w-full")}
      >
        {items.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
