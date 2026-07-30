import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashbaord";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/tasks/Tasks";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
