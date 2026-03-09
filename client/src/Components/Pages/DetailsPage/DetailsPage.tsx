import { useLocation, useNavigate } from "react-router-dom";
import type { Project, Task, Team, Member } from "../../../Types/UI.Types";
import BtnOne from "../../UI/BtnOne/BtnOne";
import MembersTable from "../../UI/MembersTable/MembersTable";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import "./DetailsPage.css";
import axios from "axios";

function DetailsPage() {
  const location = useLocation();
  const data: Project | Team | Task = location.state;

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const userId: string | undefined = useContext(AuthContext)?.user?.id;
  const thisUserRole: string | undefined = data.Members.find(
    (member: Member) => member._id == userId,
  )?.Role;

  async function Completed(id: string, type: string) {
    try {
      const port = type === "project" ? "3002" : "3003";

      const response = await axios.delete<{ message: string }>(
        `http://localhost:${port}/${type}Completed`,
        {
          data: { id },
          withCredentials: true,
        },
      );

      if (response.status === 200) navigate("/");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        auth?.setUser(null);
        navigate("/login");
        return;
      } else {
        return;
      }
    }
  }

  async function LeaveTeam(UserId: string | undefined, TeamId: string) {
    try {
      if (!UserId || !TeamId) return;

      const response = await axios.post<{ message: string }>(
        `http://localhost:3001/leaveTeam`,
        { UserId, TeamId },
        { withCredentials: true },
      );

      console.log(response);

      if (response.status === 200) navigate("/");
    } catch (error: any) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        auth?.setUser(null);
        navigate("/login");
        return;
      } else {
        return;
      }
    }
  }

  return (
    <section id="DetailsPage">
      <div id="DetailsPage-data">
        <h1>
          {"TeamName" in data
            ? data.TeamName
            : "ProjectName" in data
              ? data.ProjectName
              : data.TaskTitle}
        </h1>

        <p>{data.Description}</p>
        {"TeamName" in data ? (
          <></>
        ) : (
          <p>Due: {new Date(data.DueDate).toLocaleDateString()}</p>
        )}
        {"TeamName" in data ? (
          <></>
        ) : "ProjectName" in data ? (
          <p>Team Title: {data.Team.Name}</p>
        ) : (
          <p>Project Name: {data.Project.Name}</p>
        )}

        {"TeamName" in data && (
          <BtnOne
            text="Leave Team"
            isDisabled={false}
            type="button"
            onClick={async () => await LeaveTeam(userId, data._id)}
          />
        )}

        {"TeamName" in data && thisUserRole === "manager" && (
          <BtnOne
            text="Edit Team"
            isDisabled={false}
            link={`/editTeam/${data._id}`}
            type="button"
            state={data}
          />
        )}

        {"ProjectName" in data && (
          <BtnOne
            text="Project Completed"
            isDisabled={false}
            type="button"
            onClick={async () => await Completed(data._id, "project")}
          />
        )}

        {"TaskTitle" in data && (
          <BtnOne
            text="Task Completed"
            isDisabled={false}
            type="button"
            onClick={async () => await Completed(data._id, "task")}
          />
        )}

        <MembersTable Members={data.Members} />
      </div>
    </section>
  );
}

export default DetailsPage;
