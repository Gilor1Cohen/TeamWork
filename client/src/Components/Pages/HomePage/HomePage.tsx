import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import type { UserData } from "../../../Types/Auth.Types";
import BtnTwo from "../../UI/BtnTwo/BtnTwo";
import AddTask from "../../../Assets/img/New_Task.png";
import AddProject from "../../../Assets/img/New_Project.png";
import AddTeam from "../../../Assets/img/New_Team.png";
import BoxNums from "../../UI/BoxNums/BoxNums";
import type { HomePageData } from "../../../Types/HomePage.Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const auth: UserData | null | undefined = useContext(AuthContext)?.user;
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState<HomePageData>({
    LastUpdate: new Date(),
    Task: { Total: 0 },
    Projects: { Total: 0 },
    Teams: { Total: 0, TotalMembers: 0 },
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get<HomePageData>(
          "http://localhost:3004/getUserData",
          {
            withCredentials: true,
          },
        );

        if (res.status === 200) setData(res.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          user?.setUser(null);
          navigate("/login");
          return;
        } else {
          setError("An error occurred.");
        }
      }
    }

    getData();
  }, []);

  const TimeOfDay =
    new Date().getHours() < 12
      ? "morning"
      : new Date().getHours() < 18
        ? "afternoon"
        : "evening";

  return (
    <section id="HomePage">
      <div id="homePageSummary">
        <div id="homePageSummary-header">
          <h1 id="HomePage-H">
            Good {TimeOfDay || "day"}, {auth?.FirstName} {auth?.LastName}
          </h1>
          <p id="id">({auth?.id})</p>
        </div>
        <div id="homePageLastUpdate">
          <p>
            Last update: {new Date(data.LastUpdate).getHours()}:
            {new Date(data.LastUpdate).getMinutes() < 10
              ? "0" + new Date(data.LastUpdate).getMinutes()
              : new Date(data.LastUpdate).getMinutes()}
          </p>
          <BtnTwo
            text="Refresh"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      </div>
      <div id="QuickBtns">
        <BtnTwo text="Add Task" img={AddTask} link="/addTask" />
        <BtnTwo text="Add Project" img={AddProject} link="/addProject" />
        <BtnTwo text="Add Team" img={AddTeam} link="/addTeam" />
      </div>

      {error === null ? (
        <div className="data">
          <BoxNums Title="Tasks" Data={data.Task} link="/tasks" />
          <BoxNums Title="Projects" Data={data.Projects} link="/projects" />
          <BoxNums Title="Teams" Data={data.Teams} link="/teams" />
        </div>
      ) : (
        <p>{error}</p>
      )}
    </section>
  );
}

export default HomePage;
