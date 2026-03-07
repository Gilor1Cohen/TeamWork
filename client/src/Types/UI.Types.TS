import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import type { ProjectsData, TaskData, TeamsData } from "./HomePage.Types";

interface BtnOneProps {
  text: string;
  isDisabled: boolean;
  link?: string;
  type: "submit" | "button" | "reset" | undefined;
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
  Link: string;
}

interface Team {
  _id: string;
  TeamName: string;
  Description: string;
  Members: string[];
}

interface Project {
  _id: string;
  ProjectName: string;
  Description: string;
  DueDate: string;
  Team: string;
  Members: string[];
}

interface AddFormProps {
  Title: string;
  Description: string;
  DueDate?: Date;
  Project?: string;
  Team?: string;
}

interface AddFormResponse {
  message: string;
}

interface OptionInputProps {
  title: string;
  options: Team[] | Project[];
  error?: string;
  name: string;
  Register: UseFormRegister<any>;
  rules?: RegisterOptions;
  loading?: boolean;
}

export type {
  BtnOneProps,
  BoxDataProps,
  InputProps,
  BtnTwoProps,
  BoxNumsProps,
  Team,
  Project,
  AddFormProps,
  OptionInputProps,
  AddFormResponse,
};
