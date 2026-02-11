import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default AuthRoutes;
