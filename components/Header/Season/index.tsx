import clsx from "clsx";
import { useHeaderContext } from "../context";
import useIsMobile from "@/hooks/useIsMobile";

const Season = () => {
  const { season, seasons, setSeason } = useHeaderContext();
  const isMobile = useIsMobile();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  return (
    <div className={clsx(isMobile && "w-full px-4")}>
      <select
        value={season}
        onChange={onChange}
        className={clsx("px-2 py-1 rounded-md", isMobile && "w-full")}
      >
        {seasons.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Season;
