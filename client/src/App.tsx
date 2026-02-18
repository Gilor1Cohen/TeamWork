import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./Routes/AuthRoutes";
import UnauthRoutes from "./Routes/UnauthRoutes";
import { AuthContext } from "./Components/Contexts/AuthContext";
import { useContext, useEffect } from "react";
import type { AuthResponse, UserData } from "./Types/Auth.Types";
import axios from "axios";
import "./App.css";

function App() {
  const auth: UserData | null | undefined = useContext(AuthContext)?.user;

  const setAuth = useContext(AuthContext)?.setUser as React.Dispatch<
    React.SetStateAction<UserData | null>
  >;

  useEffect(() => {
    async function fetchUser(): Promise<void> {
      try {
        const isAuth = await axios.get<AuthResponse>(
          "http://localhost:3000/UserAuth",
          {
            withCredentials: true,
          },
        );

        if (isAuth.status === 200) {
          const userData: UserData = isAuth.data.user;
          setAuth?.(userData);
        } else {
          setAuth?.(null);
        }
      } catch (error) {
        setAuth?.(null);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        {auth !== undefined && auth !== null ? (
          <AuthRoutes />
        ) : (
          <UnauthRoutes />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
