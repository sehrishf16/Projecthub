import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAuthenticated } from "../../utils/session";

const ProtectedRoute = () => {
  const location = useLocation();

  const authenticated = isAuthenticated();

  if (!authenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;