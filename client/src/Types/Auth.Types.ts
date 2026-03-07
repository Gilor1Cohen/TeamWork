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
  AuthForm,
  UserData,
  AuthResponse,
  AuthContextType,
  AuthProviderProps,
};
