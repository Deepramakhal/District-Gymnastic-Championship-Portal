import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("admin_token_secret21122025");

  // Not logged in → kick out
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Logged in → allow
  return <Outlet />;
};

export default ProtectedRoute;
