import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./Routes/AuthRoutes";
import UnauthRoutes from "./Routes/UnauthRoutes";
import "./App.css";

function App() {
  const auth: boolean = false;

  return (
    <>
      <BrowserRouter>{auth ? <AuthRoutes /> : <UnauthRoutes />}</BrowserRouter>
    </>
  );
}

export default App;
