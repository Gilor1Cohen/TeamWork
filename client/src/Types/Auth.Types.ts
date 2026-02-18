import type { UseFormRegister } from "react-hook-form";

interface AuthFormInputs {
  Register: UseFormRegister<AuthForm>;
  Type: string;
  Name: keyof AuthForm;
  Placeholder: string;
  Error?: string;
  Label: string;
  Rules: { required?: string };
}

interface AuthForm {
  FirstName?: string;
  LastName?: string;
  Email: string;
  Password: string;
}

interface UserData {
  FirstName: string;
  LastName: string;
  Email: string;
  id: string;
}

interface AuthResponse {
  user: UserData;
}

interface AuthContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export type {
  AuthFormInputs,
  AuthForm,
  UserData,
  AuthResponse,
  AuthContextType,
  AuthProviderProps,
};
