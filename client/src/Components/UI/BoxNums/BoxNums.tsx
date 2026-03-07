import { Link } from "react-router-dom";
import type { BoxNumsProps } from "../../../Types/UI.Types";
import "./BoxNums.css";

function BoxNums({ Title, Data, link }: BoxNumsProps) {
  return (
    <div className="BoxNums">
      <h1>{Title}</h1>
      <p>Total: {Data.Total}</p>
      {"InProgress" in Data && <p>In Progress: {Data.InProgress}</p>}
      {"overdue" in Data && <p>Overdue: {Data.overdue}</p>}
      {"NewThisWeek" in Data && <p>New This Week: {Data.NewThisWeek}</p>}
      {"TotalMembers" in Data && <p>Total Members: {Data.TotalMembers}</p>}
      <Link to={link}>view more</Link>
    </div>
  );
}

export default BoxNums;
