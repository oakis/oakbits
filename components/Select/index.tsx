import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Item<T> {
  name: string;
  id: T;
}

interface SelectProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  items: Item<T>[];
  wrapperClasses?: string;
}

const Select = <T extends string>({
  onChange,
  value,
  items,
  wrapperClasses,
}: SelectProps<T>) => {
  const isMobile = useIsMobile();

  return (
    <div className={clsx(isMobile && "w-full px-4", wrapperClasses)}>
      <div className={clsx("relative")}>
        <select
          value={value}
          onChange={onChange}
          className={clsx(
            "px-2 py-1 pr-8 rounded-md appearance-none text-black",
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
          className="absolute h-8 flex items-center text-black"
          style={{
            top: 0,
            right: 8,
            pointerEvents: "none",
          }}
        >
          <FaChevronDown size="16" style={{ pointerEvents: "none" }} />
        </span>
      </div>
    </div>
  );
};

export default Select;
