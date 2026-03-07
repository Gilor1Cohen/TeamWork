import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BtnOne from "../../UI/BtnOne/BtnOne";
import OptionInput from "../../UI/OptionInput/OptionInput";
import type {
  AddFormProps,
  AddFormResponse,
  Project,
  Team,
} from "../../../Types/UI.Types";
import { AuthContext } from "../../Contexts/AuthContext";
import "./AddPage.css";

function AddPage() {
  const title: string = useLocation().pathname.split("/")[1].replace("add", "");

  const [projectsData, setProjectsData] = useState<Project[] | null>(null);

  const [teamsData, setTeamsData] = useState<Team[] | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [optionsLoading, setOptionsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddFormProps>();

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    reset();

    if (title !== "Task" && title !== "Project") return;

    async function GetProjectsData(): Promise<void> {
      try {
        setOptionsLoading(true);

        const response = await axios.get<Project[]>(
          "http://localhost:3002/projectsByUser",
          {
            withCredentials: true,
          },
        );

        setProjectsData(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setProjectsData([]);
          return;
        } else if (error.response && error.response.status === 401) {
          auth?.setUser(null);
          navigate("/login");
          return;
        }
      } finally {
        setOptionsLoading(false);
      }
    }

    async function GetTeamsData(): Promise<void> {
      try {
        setOptionsLoading(true);

        const response = await axios.get<Team[]>(
          "http://localhost:3001/teamsByUser",
          {
            withCredentials: true,
          },
        );

        setTeamsData(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setTeamsData([]);
          return;
        } else if (error.response && error.response.status === 401) {
          auth?.setUser(null);
          navigate("/login");
          return;
        }
      } finally {
        setOptionsLoading(false);
      }
    }

    title === "Task" ? GetProjectsData() : GetTeamsData();
  }, [title]);

  async function onFormSubmit(data: AddFormProps): Promise<void> {
    try {
      setFormError(null);
      setFormLoading(true);

      let endpoint = "";

      switch (title) {
        case "Task":
          endpoint = "http://localhost:3003/addTask";
          break;
        case "Project":
          endpoint = "http://localhost:3002/addProject";
          break;
        case "Team":
          endpoint = "http://localhost:3001/addTeam";
          break;
      }

      const response = await axios.post<AddFormResponse>(endpoint, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        reset();
        navigate(`/${title.toLowerCase()}s`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        auth?.setUser(null);
        navigate("/login");
        return;
      } else {
        setFormError("An error occurred while adding the item.");
      }
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="add-page">
      <h1 id="MainTitle">Add {title}</h1>

      <div id="AddPage-options">
        <div>
          <label>
            <Link to="/addTask">
              <input
                type="radio"
                name="radio"
                checked={title === "Task"}
                readOnly
              />
              <span>Add Task</span>
            </Link>
          </label>

          <label>
            <Link to="/addProject">
              <input
                type="radio"
                name="radio"
                checked={title === "Project"}
                readOnly
              />
              <span>Add Project</span>
            </Link>
          </label>

          <label>
            <Link to="/addTeam">
              <input
                type="radio"
                name="radio"
                checked={title === "Team"}
                readOnly
              />
              <span>Add Team</span>
            </Link>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          Register={register}
          Type="text"
          Name="Title"
          Placeholder="Title"
          Label="Title / Name"
          Rules={{
            required: "Title is required",
            minLength: { value: 3, message: "Title too short" },
            maxLength: { value: 256, message: "Title too long" },
          }}
          Error={errors.Title?.message}
        />
        <Input
          Register={register}
          Type="text"
          Name="Description"
          Placeholder={`Description of the ${title}`}
          Label={`Description of the ${title}`}
          Rules={{
            required: "Description is required",
            minLength: { value: 10, message: "Description too short" },
            maxLength: { value: 512, message: "Description too long" },
          }}
          Error={errors.Description?.message}
        />
        {title !== "Team" && (
          <Input
            Register={register}
            Type="date"
            Name="DueDate"
            Placeholder="Due Date"
            Label="Due Date"
            Rules={{
              required: "Due date is required",

              min: {
                value: new Date().toISOString().split("T")[0],
                message: "Due date cannot be in the past",
              },

              max: {
                value: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1),
                )
                  .toISOString()
                  .split("T")[0],
                message: "Due date cannot be more than 1 year in the future",
              },
            }}
            Error={errors.DueDate?.message}
          />
        )}
        {title === "Task" && projectsData && (
          <OptionInput
            title="Project"
            options={projectsData}
            error={errors.Project?.message}
            name="Project"
            Register={register}
            rules={{
              required: "Project is required",
            }}
            loading={optionsLoading}
          />
        )}

        {title === "Project" && teamsData && (
          <OptionInput
            title="Team"
            options={teamsData}
            error={errors.Team?.message}
            name="Team"
            Register={register}
            rules={{
              required: "Team is required",
            }}
            loading={optionsLoading}
          />
        )}

        <BtnOne
          text={`Add ${title}`}
          isDisabled={!isValid || formLoading}
          type="submit"
        />

        {formError && <p className="Form-Error">{formError}</p>}
      </form>
    </div>
  );
}

export default AddPage;
