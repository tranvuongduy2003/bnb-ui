import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtectedRoute: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn && profile.role === "user" ? (
    <Navigate to="/" replace />
  ) : loggedIn && profile.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default AuthProtectedRoute;
