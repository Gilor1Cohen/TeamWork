import { Link } from "react-router-dom";
import type { BtnOneProps } from "../../../Types/UI.Types.ts";
import "./BtnOne.css";

function BtnOne({ text, isDisabled, link, type }: BtnOneProps) {
  if (link) {
    return (
      <Link to={link}>
        <button type={type} id="BtnOne" disabled={isDisabled}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button type={type} id="BtnOne" disabled={isDisabled}>
      {text}
    </button>
  );
}

export default BtnOne;
