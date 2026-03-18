import { type OptionProps } from '../../types/food';

function DropdownInput({ opt, setOpt}: OptionProps) {
  const options = ["g", "kg", "ml", "dl", "l", "stk", "pose", "dåse"];
  let w1 = "w-18"
  let w2 = "w-14"
  if(opt === "") {
    w1 = "w-27"
    w2 = "w-23"
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const raw = e.target.value;
    setOpt(raw);
  };
  return (
      <div className={`bg-amber-50/90 p-2 border border-amber-50 rounded-2xl self-center mt-5 ${w1}`}>
        <label htmlFor="dropdown"></label>
        <select className={`rounded-2xl self-center cursor-pointer ${w2}`}
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