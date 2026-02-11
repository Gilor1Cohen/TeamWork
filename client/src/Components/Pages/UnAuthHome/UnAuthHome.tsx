import BoxData from "../../UI/BoxData/BoxData";
import BtnOne from "../../UI/BtnOne/BtnOne";

import firstImg from "../../../assets/img/firstSecUn.png";
import Organize from "../../../assets/img/organize.png";
import Track from "../../../assets/img/Track.png";
import Collaborate from "../../../assets/img/Collaborate.png";

import type { BoxDataProps } from "../../../Types/UI.Types";

import "./UnAuthHome.css";

function UnAuthHome() {
  const boxesData: BoxDataProps[] = [
    {
      title: "Organize Work by Teams & Projects",
      imageName: Organize,
      description:
        "Create separate workspaces for different teams, manage multiple projects at once, and keep tasks structured in a clean hierarchy.",
    },
    {
      title: "Track Progress in Real Time",
      imageName: Track,
      description:
        "See task updates instantly, monitor deadlines, and always know what stage your project is in, without endless meetings.",
    },
    {
      title: "Collaborate Without the Chaos",
      imageName: Collaborate,
      description:
        "Assign tasks, share updates, and keep communication connected directly to the work, so nothing gets lost in chats or emails.",
    },
  ];

  return (
    <section className="unauth-home">
      <article id="articleOne">
        <h3 id="teamwork-title">TeamWork</h3>
        <h1>Manage Your Team Project Efficiently</h1>
        <p>
          Manage tasks, projects, and teams in one modern workspace built for
          developers.
        </p>
        <BtnOne text="Get Started" isDisabled={false} link="/login" />
        <img
          id="firstImg"
          src={firstImg}
          alt="TeamWork dashboard preview showing tasks and teams"
          loading="lazy"
        />
      </article>

      <article id="articleTwo">
        <h2 id="articleTwo-h2">About TeamWork</h2>
        <p id="articleTwo-p">
          TeamWork is a website for managing tasks and projects by team, in one
          organized and clear place. Each team sees their projects and tasks,
          updates statuses and tracks progress in real time. A modern interface
          designed specifically for development teams who want to work
          efficiently and stay coordinated.
        </p>

        <div className="boxes">
          {boxesData.map((box, index) => (
            <BoxData
              key={index}
              title={box.title}
              imageName={box.imageName}
              description={box.description}
            />
          ))}
        </div>
      </article>
    </section>
  );
}

export default UnAuthHome;
