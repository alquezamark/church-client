import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // ✅ Simplified authentication check
    setLoading(false); // ✅ Mark loading complete
  }, []);

  if (loading) return <p>Loading...</p>; // ✅ Prevent flickering with a loading state

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
