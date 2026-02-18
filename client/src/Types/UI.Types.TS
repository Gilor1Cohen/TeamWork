import type { AuthFormInputs } from "./Auth.Types";

interface BtnOneProps {
  text: string;
  isDisabled: boolean;
  link?: string;
  type: "submit" | "button" | "reset" | undefined;
}

interface BoxDataProps {
  title: string;
  imageName: string;
  description: string;
}

type InputProps = AuthFormInputs | any;

export type { BtnOneProps, BoxDataProps, InputProps };
