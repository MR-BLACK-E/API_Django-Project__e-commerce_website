// src/components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/Login" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");
    return <Navigate to="/admin/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;

// components/PrivateRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   // Check if token exists in localStorage
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     // No token → redirect to login
//     return <Navigate to="/admin/Login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



