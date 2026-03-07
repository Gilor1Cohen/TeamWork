import type { OptionInputProps, Project, Team } from "../../../Types/UI.Types";
import "./OptionInput.css";

function OptionInput({
  title,
  options,
  error,
  name,
  Register,
  rules,
  loading,
}: OptionInputProps) {
  return (
    <div className="option-input">
      <select defaultValue="" id={name} {...Register(name, rules)}>
        <option value="" disabled hidden>
          {loading ? "Loading..." : title}
        </option>

        {options.map((option: Team | Project) => (
          <option key={option._id} value={option._id}>
            {"TeamName" in option ? option.TeamName : option.ProjectName}
          </option>
        ))}
      </select>
      {error && <p className="Input-Error">{error}</p>}
    </div>
  );
}

export default OptionInput;
