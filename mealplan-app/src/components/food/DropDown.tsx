import { type OptionProps } from '../../types/food';

function DropdownInput({ opt, setOpt}: OptionProps) {
  const options = ["g", "kg", "ml", "l", "stk"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const raw = e.target.value;
    setOpt(raw);
  };

  return (
    <div className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl self-center w-15 mt-5">
      <label htmlFor="dropdown"></label>
      <select className="rounded-2xl self-center w-11 cursor-pointer"
              value={opt} 
              onChange={handleChange}>
        <option className="w-10 self-center bg-amber-50/90" value="" disabled>Vælg en…</option>
        {options.map((opt) => (
          <option className="w-10 self-center bg-amber-50/90 cursor-pointer"  key={opt} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownInput