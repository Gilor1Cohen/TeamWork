import { Link } from "react-router-dom";
import type { BtnOneProps } from "../../../Types/UI.Types.ts";
import "./BtnOne.css";

function BtnOne({ text, isDisabled, link }: BtnOneProps) {
  return (
    <Link to={link}>
      <button id="BtnOne" disabled={isDisabled}>
        {text}
      </button>
    </Link>
  );
}

export default BtnOne;
