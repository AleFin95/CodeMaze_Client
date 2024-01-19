import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts";

const ProtectedRoute = ({ redirectTo }) => {
  const { accessToken } = useAuth();

  // If user is not authenticated or token is not valid, redirect to the login page
  if (!accessToken) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
