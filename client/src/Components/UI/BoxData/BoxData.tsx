import type { BoxDataProps } from "../../../Types/UI.Types";
import "./BoxData.css";

function BoxData({ title, imageName, description }: BoxDataProps) {
  return (
    <div className="BoxData">
      <h4 className="BoxData-title">{title}</h4>
      <img
        className="BoxData-image"
        src={imageName}
        alt={title}
        loading="lazy"
      />
      <p className="BoxData-description">{description}</p>
    </div>
  );
}

export default BoxData;
