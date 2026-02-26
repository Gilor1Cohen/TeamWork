import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../Components/Pages/AuthPage/AuthPage";
import UnAuthHome from "../Components/Pages/UnAuthHome/UnAuthHome";

function UnauthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UnAuthHome />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default UnauthRoutes;
