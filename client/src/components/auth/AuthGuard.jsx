// src/components/auth/AdminRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGaurd({ children }) {
  const role = useSelector((state) => state.user.userInfo?.role);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthGaurd;
