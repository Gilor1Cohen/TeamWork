import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import type { UserData } from "../../../Types/Auth.Types";
import BtnTwo from "../../UI/BtnTwo/BtnTwo";
import AddTask from "../../../Assets/img/New_Task.png";
import AddProject from "../../../Assets/img/New_Project.png";
import AddTeam from "../../../Assets/img/New_Team.png";
import BoxNums from "../../UI/BoxNums/BoxNums";
import type { HomePageData } from "../../../Types/HomePage.Types";
import "./HomePage.css";

function HomePage() {
  const auth: UserData | null | undefined = useContext(AuthContext)?.user;

  const [data, setData] = useState<HomePageData>({
    DueToday: 0,
    LastUpdate: new Date(),
    Task: { Total: 0, InProgress: 0, overdue: 0 },
    Projects: { Total: 0, NewThisWeek: 0, overdue: 0 },
    Teams: { Total: 0, NewThisWeek: 0, TotalMembers: 0 },
  });

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
        <p id="homePageTasksDueText">
          You have {data.DueToday} tasks due today.
        </p>
        <div id="homePageLastUpdate">
          <p>
            Last update: {data.LastUpdate.getHours()}:
            {data.LastUpdate.getMinutes() < 10
              ? "0" + data.LastUpdate.getMinutes()
              : data.LastUpdate.getMinutes()}
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

      <div className="data">
        <BoxNums Title="Tasks" Data={data.Task} link="/tasks" />
        <BoxNums Title="Projects" Data={data.Projects} link="/projects" />
        <BoxNums Title="Teams" Data={data.Teams} link="/teams" />
      </div>
    </section>
  );
}

export default HomePage;
