import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";


// const ProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("RefreshToken");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
