import { Routes, Route } from "react-router-dom";
import AuthPage from "../Components/Pages/AuthPage/AuthPage";
import UnAuthHome from "../Components/Pages/UnAuthHome/UnAuthHome";

function UnauthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UnAuthHome />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default UnauthRoutes;
