import type { AuthFormInputs } from "./Auth.Types";
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

type InputProps = AuthFormInputs | any;

interface BoxNumsProps {
  Title: string;
  Data: TaskData | ProjectsData | TeamsData;
  Link: string;
}

export type {
  BtnOneProps,
  BoxDataProps,
  InputProps,
  BtnTwoProps,
  BoxNumsProps,
};
