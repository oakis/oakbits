import { useHeaderContext } from "../context";
import Select from "@/components/Select";

const Season = () => {
  const { season, seasons, setSeason } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  const items = seasons.map((s) => ({ ...s, id: s.id.toString() }));

  return <Select onChange={onChange} value={season} items={items} />;
};

export default Season;
