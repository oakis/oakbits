import { useHeaderContext } from "../context";
import Select from "@/components/Select";

const Team = () => {
  const { team, teams, setTeam } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event.target.value);
  };

  return <Select onChange={onChange} value={team} items={teams} />;
};

export default Team;
