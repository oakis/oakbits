import clsx from "clsx";
import { useHeaderContext } from "../context";
import useIsMobile from "@/hooks/useIsMobile";

const Team = () => {
  const { team, teams, setTeam } = useHeaderContext();
  const isMobile = useIsMobile();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event.target.value);
  };

  return (
    <div className={clsx(isMobile && "w-full px-4")}>
      <select
        value={team}
        onChange={onChange}
        className={clsx("px-2 py-1 rounded-md", isMobile && "w-full")}
      >
        {teams.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Team;
