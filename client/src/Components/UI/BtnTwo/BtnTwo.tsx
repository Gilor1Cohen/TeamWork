import { Link } from "react-router-dom";
import type { BtnTwoProps } from "../../../Types/UI.Types";
import "./BtnTwo.css";

function BtnTwo({ text, link, img, onClick }: BtnTwoProps) {
  if (link) {
    return (
      <Link to={link}>
        <button type="button" id="BtnTwo" onClick={onClick}>
          {img && <img src={img} alt="Button icon" />}
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button type="button" id="BtnTwo" onClick={onClick}>
      {img && <img src={img} alt="Button icon" />}
      {text}
    </button>
  );
}
export default BtnTwo;
