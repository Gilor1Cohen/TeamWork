import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";
import AddPage from "../Components/Pages/AddPage/AddPage";
import DataPage from "../Components/Pages/DataPage/DataPage";
import DetailsPage from "../Components/Pages/DetailsPage/DetailsPage";
import EditTeamPage from "../Components/Pages/EditTeamPage/EditTeamPage";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/tasks" element={<DataPage />} />
        <Route path="/projects" element={<DataPage />} />
        <Route path="/teams" element={<DataPage />} />

        <Route path="/tasks/:id" element={<DetailsPage />} />
        <Route path="/projects/:id" element={<DetailsPage />} />
        <Route path="/teams/:id" element={<DetailsPage />} />

        <Route path="/editTeam/:id" element={<EditTeamPage />} />

        <Route path="/addTask" element={<AddPage />} />
        <Route path="/addProject" element={<AddPage />} />
        <Route path="/addTeam" element={<AddPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AuthRoutes;
