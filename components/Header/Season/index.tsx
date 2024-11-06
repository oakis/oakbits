import { useHeaderContext } from "../context";
import Select from "@/components/Select";

const Season = () => {
  const { season, seasons, setSeason } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  return <Select onChange={onChange} value={season} items={seasons} />;
};

export default Season;
