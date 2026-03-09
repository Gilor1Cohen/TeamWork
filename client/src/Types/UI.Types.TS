import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import type { ProjectsData, TaskData, TeamsData } from "./HomePage.Types";

interface BtnOneProps {
  text: string;
  isDisabled: boolean;
  link?: string;
  type: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  state?: Team;
}

interface BtnTwoProps {
  text: string;
  link?: string;
  img?: string;
  onClick?: () => void;
}

interface BoxDataProps {
  title: string;
  imageName: string;
  description: string;
}

interface InputProps {
  Register: UseFormRegister<any>;
  Type: string;
  Name: string;
  Placeholder: string;
  Error?: string;
  Label: string;
  Rules?: RegisterOptions;
}

interface BoxNumsProps {
  Title: string;
  Data: TaskData | ProjectsData | TeamsData;
  link: string;
}

interface Member {
  Name: string;
  _id: string;
  Role: string;
}

interface Team {
  _id: string;
  TeamName: string;
  Description: string;
  Members: Member[];
}

interface Project {
  _id: string;
  ProjectName: string;
  Description: string;
  DueDate: string;
  Team: { _id: string; Name: string };
  Members: Member[];
}

interface Task {
  _id: string;
  TaskTitle: string;
  Description: string;
  DueDate: string;
  Project: { _id: string; Name: string };
  Members: Member[];
}

interface AddFormProps {
  Title: string;
  Description: string;
  DueDate?: Date | string;
  Project?:
    | {
        id: string;
        name: string;
      }
    | string;

  Team?:
    | {
        id: string;
        name: string;
      }
    | string;
}

interface AddFormResponse {
  message: string;
}

type UserRole = "manager" | "worker";

interface OptionInputProps {
  title: string;
  options: Team[] | Project[] | UserRole[];
  error?: string;
  name: string;
  Register: UseFormRegister<any>;
  rules?: RegisterOptions;
  loading?: boolean;
}

interface DataPageBoxProps {
  data: Project | Team | Task;
}

interface MembersTableProps {
  Members: Member[];
}

export type {
  BtnOneProps,
  BoxDataProps,
  InputProps,
  BtnTwoProps,
  BoxNumsProps,
  Team,
  Project,
  Task,
  AddFormProps,
  OptionInputProps,
  AddFormResponse,
  DataPageBoxProps,
  Member,
  MembersTableProps,
  UserRole,
};
