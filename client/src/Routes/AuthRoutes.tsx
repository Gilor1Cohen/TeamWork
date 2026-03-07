import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";
import AddPage from "../Components/Pages/AddPage/AddPage";
import DataPage from "../Components/Pages/DataPage/DataPage";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<DataPage />} />
        <Route path="/projects" element={<DataPage />} />
        <Route path="/teams" element={<DataPage />} />
        <Route path="/addTask" element={<AddPage />} />
        <Route path="/addProject" element={<AddPage />} />
        <Route path="/addTeam" element={<AddPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AuthRoutes;
