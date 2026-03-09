import { Link } from "react-router-dom";
import type { BtnOneProps } from "../../../Types/UI.Types.ts";
import "./BtnOne.css";

function BtnOne({ text, isDisabled, link, type, onClick, state }: BtnOneProps) {
  if (link) {
    return (
      <Link to={link} state={state}>
        <button type={type} id="BtnOne" disabled={isDisabled} onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button type={type} id="BtnOne" disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
}

export default BtnOne;
