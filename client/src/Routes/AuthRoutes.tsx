import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/tasks" element={<TasksPage />} /> */}
        {/* <Route path="/projects" element={<ProjectsPage />} /> */}
        {/* <Route path="/teams" element={<TeamsPage />} /> */}
        {/* <Route path="/addTask" element={<AddPage />} /> */}
        {/* <Route path="/addProject" element={<AddPage />} /> */}
        {/* <Route path="/addTeam" element={<AddPage />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AuthRoutes;
