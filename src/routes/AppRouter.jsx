// import { Navigate, Route, Routes } from "react-router-dom";

// import DashboardLayout from "../layouts/DashboardLayout";
// import Dashboard from "../pages/dashboard/Dashbaord";
// import Projects from "../pages/projects/Projects";
// import Tasks from "../pages/tasks/Tasks";
// import Team from "../pages/team/Team";
// import Kanban from "../pages/kanban/Kanban";
// import Calendar from "../pages/calender/Calendar";
// import Settings from "../pages/settings/Settings";

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />

//       <Route element={<DashboardLayout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="tasks" element={<Tasks />} />
//         <Route path="/team" element={<Team />} />
//         <Route path="/kanban" element={<Kanban />} />
//         <Route path="/calendar" element={<Calendar />} />
//         <Route path="/settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRouter;



import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Auth
import Welcome from "../pages/auth/Welcome";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Dashboard from "../pages/dashboard/Dashbaord";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/tasks/Tasks";
import Team from "../pages/team/Team";
import Kanban from "../pages/kanban/Kanban";
import Calendar from "../pages/calender/Calendar";
import Settings from "../pages/settings/Settings";

const AppRouter = () => {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC ROUTES
      ====================================================== */}

      {/* Welcome Screen */}
      <Route
        path="/"
        element={<Welcome />}
      />

      {/* Sign In */}
      <Route
        path="/signin"
        element={<SignIn />}
      />

      {/* Sign Up */}
      <Route
        path="/signup"
        element={<SignUp />}
      />

      {/* =====================================================
          PROTECTED ROUTES
      ====================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/team"
            element={<Team />}
          />

          <Route
            path="/kanban"
            element={<Kanban />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>
      </Route>

      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;