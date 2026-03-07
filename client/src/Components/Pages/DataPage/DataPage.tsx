import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type { Project, Team, Task } from "../../../Types/UI.Types";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import DataPageBox from "../../UI/DataPageBox/DataPageBox";
import "./DataPage.css";

function DataPage() {
  const title: string = useLocation().pathname.split("/")[1];
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [TeamsData, setTeamsData] = useState<Team[] | null>(null);
  const [TasksData, setTasksData] = useState<Task[] | null>(null);
  const [ProjectsData, setProjectsData] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function GetData() {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "";

        switch (title) {
          case "tasks":
            endpoint = "http://localhost:3003/tasksByUser";
            break;
          case "projects":
            endpoint = "http://localhost:3002/projectsByUser";
            break;
          case "teams":
            endpoint = "http://localhost:3001/teamsByUser";
            break;
        }

        const data = await axios.get<Project[] | Team[] | Task[]>(endpoint, {
          withCredentials: true,
        });

        if (data.status === 200) {
          switch (title) {
            case "tasks":
              setTasksData(data.data as Task[]);
              break;
            case "projects":
              setProjectsData(data.data as Project[]);
              break;
            case "teams":
              setTeamsData(data.data as Team[]);
              break;
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          switch (title) {
            case "tasks":
              setError("No tasks found for this user.");
              break;
            case "projects":
              setError("No projects found for this user.");
              break;
            case "teams":
              setError("No teams found for this user.");
              break;
          }
          return;
        } else if (error.response && error.response.status === 401) {
          auth?.setUser(null);
          navigate("/login");
          return;
        }
      } finally {
        setLoading(false);
      }
    }

    GetData();
  }, [title]);

  return (
    <section id="DataPage">
      <h1>{title}</h1>

      <div className="data-container">
        {error && <p id="Error">{error}</p>}
        {loading && <p id="Loading">Loading...</p>}
        {!loading && !error && title === "tasks" && !TasksData && (
          <p id="NoData">No data available.</p>
        )}
        {!loading && !error && title === "projects" && !ProjectsData && (
          <p id="NoData">No data available.</p>
        )}
        {!loading && !error && title === "teams" && !TeamsData && (
          <p id="NoData">No data available.</p>
        )}

        {!loading && !error && title === "tasks" && TasksData && (
          <div id="TasksData">
            {TasksData.map((task: Task) => (
              <DataPageBox key={task._id} data={task} />
            ))}
          </div>
        )}

        {!loading && !error && title === "projects" && ProjectsData && (
          <div id="ProjectsData">
            {ProjectsData.map((project: Project) => (
              <DataPageBox key={project._id} data={project} />
            ))}
          </div>
        )}

        {!loading && !error && title === "teams" && TeamsData && (
          <div id="TeamsData">
            {TeamsData.map((team: Team) => (
              <DataPageBox key={team._id} data={team} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DataPage;
