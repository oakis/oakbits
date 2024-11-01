import { useHeaderContext } from "../context";

const Team = () => {
  const { team, teams, setTeam } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event.target.value);
  };

  return (
    <select value={team} onChange={onChange} className="px-2 py-1 rounded-md">
      {teams.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default Team;
