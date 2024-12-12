import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Item {
  name: string;
  id: number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  items: Item[];
}

const Select = ({ onChange, value, items }: SelectProps) => {
  const isMobile = useIsMobile();

  const getIconXPos = (): number => {
    return isMobile ? 22 : 8;
  };

  return (
    <div className={clsx("relative", isMobile && "w-full px-4")}>
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          "px-2 py-1 pr-8 rounded-md appearance-none",
          isMobile && "w-full"
        )}
      >
        {items.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <span
        className="absolute h-8 flex items-center"
        style={{
          top: 0,
          right: getIconXPos(),
          pointerEvents: "none",
        }}
      >
        <FaChevronDown size="16" style={{ pointerEvents: "none" }} />
      </span>
    </div>
  );
};

export default Select;
