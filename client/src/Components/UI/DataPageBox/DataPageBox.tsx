import "./DataPageBox.css";
import type { Project, Team, Task } from "../../../Types/UI.Types";
import { Link } from "react-router-dom";

function DataPageBox({ data }: { data: Project | Team | Task }) {
  const title =
    "TeamName" in data
      ? data.TeamName
      : "ProjectName" in data
        ? data.ProjectName
        : data.TaskTitle;

  const To =
    "TeamName" in data
      ? `/teams/${data._id}`
      : "ProjectName" in data
        ? `/projects/${data._id}`
        : `/tasks/${data._id}`;

  return (
    <Link to={To} className="DataPageBox">
      <h3>{title}</h3>

      <p>{data.Description}</p>
    </Link>
  );
}

export default DataPageBox;
