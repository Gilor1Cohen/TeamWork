import type { InputProps } from "../../../Types/UI.Types";
import "./Input.css";

function Input({
  Register,
  Type,
  Name,
  Placeholder,
  Error,
  Label,
  Rules,
}: InputProps) {
  return (
    <div className="Input">
      <label className="Input-label" htmlFor={Name}>
        {Label}
      </label>
      <input
        id={Name}
        type={Type}
        name={Name}
        placeholder={Placeholder}
        {...Register(Name, Rules)}
      />
      {Error && <p className="Input-Error">{Error}</p>}
    </div>
  );
}

export default Input;
