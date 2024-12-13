import { useHeaderContext } from "../context";
import Select from "@/components/Select";

const Team = () => {
  const { team, teams, setTeam } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event.target.value);
  };

  const items = teams.map((t) => ({ ...t, id: t.id.toString() }));

  return <Select onChange={onChange} value={team} items={items} />;
};

export default Team;
