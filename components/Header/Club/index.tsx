import { useCallback, useEffect, useRef, useState } from "react";
import { useHeaderContext } from "../context";
import { FaChevronDown } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import clsx from "clsx";
import useIsMobile from "@/hooks/useIsMobile";

const Club = () => {
  const { club, clubs, setClub } = useHeaderContext();
  const isMobile = useIsMobile();

  const inputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  const isDirty = filter !== "";

  const getClubById = useCallback(
    (id: string) => clubs.find((c) => id === c.id)?.name ?? "",
    [clubs]
  );

  const onSelect = (id: string) => {
    setClub(id);
    setFilter(getClubById(id));
    toggleDropdown(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const toggleDropdown = (state: boolean) => {
    setTimeout(() => {
      setOpen(state);
    }, 0);
  };

  const onReset = () => {
    setFilter("");
    toggleDropdown(true);
  };

  useEffect(() => {
    if (clubs.length > 0) {
      setFilter(getClubById(club));
    }
  }, [club, clubs, getClubById]);

  const filteredClubs = clubs.filter((f) =>
    f.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getIconXPos = (): number => {
    if (isDirty) {
      return isMobile ? 24 : 8;
    }
    return isMobile ? 22 : 8;
  };

  return (
    <div className={clsx("relative", isMobile && "w-full px-4")} ref={inputRef}>
      <input
        value={filter}
        onChange={onInputChange}
        onFocus={() => toggleDropdown(true)}
        className={clsx(
          "px-2 py-1 pr-8 rounded-md bg-white relative",
          isMobile && "w-full"
        )}
        placeholder="Sök på klubb.."
      />
      {open && (
        <div
          className="fixed w-full h-full top-0 left-0 z-10"
          onClick={() => toggleDropdown(false)}
        >
          <div
            className="absolute bg-white z-20 overflow-auto rounded-md shadow-md p-3 shadow-slate-500 flex flex-col justify-start gap-1"
            style={{
              top:
                (inputRef.current?.offsetTop ?? 0) +
                (inputRef.current?.offsetHeight ?? 0) +
                1,
              left: isMobile ? 16 : inputRef.current?.offsetLeft,
              maxHeight: "calc(100vh - 160px)",
              minWidth: inputRef.current?.children[0].scrollWidth,
            }}
          >
            {filteredClubs.length > 0 ? (
              filteredClubs.map((s) => (
                <button
                  key={s.id}
                  value={s.id}
                  onClick={() => onSelect(s.id)}
                  className="text-left"
                >
                  {s.name}
                </button>
              ))
            ) : (
              <div>Hittade ingen klubb med det namnet.</div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={onReset}
        className="absolute h-8"
        style={{
          top: 0,
          right: getIconXPos(),
        }}
      >
        {isDirty ? (
          <FaX size="12" preserveAspectRatio="none" />
        ) : (
          <FaChevronDown size="16" />
        )}
      </button>
    </div>
  );
};

export default Club;
