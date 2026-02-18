import { createContext, useState } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  UserData,
} from "../../Types/Auth.Types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
