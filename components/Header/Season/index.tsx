import { useHeaderContext } from "../context";

const Season = () => {
  const { season, seasons, setSeason } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  return (
    <select value={season} onChange={onChange} className="px-2 py-1 rounded-md">
      {seasons.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default Season;
