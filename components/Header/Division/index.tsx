import { useHeaderContext } from "../context";

const Division = () => {
  const { division, divisions, setDivision } = useHeaderContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDivision(event.target.value);
  };

  return (
    <select
      value={division}
      onChange={onChange}
      className="px-2 py-1 rounded-md"
    >
      {divisions.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default Division;
