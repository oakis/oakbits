import { useCallback, useEffect, useRef, useState } from "react";
import { useHeaderContext } from "../context";
import { MdClose } from "react-icons/md";

const Club = () => {
  const { club, clubs, setClub } = useHeaderContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

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
    }, 1);
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

  return (
    <>
      <input
        value={filter}
        onChange={onInputChange}
        onFocus={() => toggleDropdown(true)}
        onBlur={() => toggleDropdown(false)}
        className="px-2 py-1 rounded-md bg-white relative"
        ref={inputRef}
      />
      {open && (
        <div
          className="absolute bg-white z-10 overflow-scroll rounded-md shadow-md p-3 shadow-slate-500 flex flex-col justify-start gap-1"
          style={{
            top:
              (inputRef.current?.offsetTop ?? 0) +
              (inputRef.current?.offsetHeight ?? 0) +
              1,
            left: inputRef.current?.offsetLeft,
            maxHeight: "90%",
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
      )}
      <button
        onClick={onReset}
        className="absolute"
        style={{
          top:
            (inputRef.current?.offsetTop ?? 0) +
            (inputRef.current?.offsetHeight ?? 0) / 2 -
            8,
          left:
            (inputRef.current?.offsetLeft ?? 0) +
            (inputRef.current?.offsetWidth ?? 0) -
            20,
        }}
      >
        <MdClose size="16" />
      </button>
    </>
  );
};

export default Club;
