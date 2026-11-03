import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          "/api/auth/me",
          {
            credentials: "include"
          }
        );

        setStatus(response.ok ? "authenticated" : "unauthorized");
      } catch  {
        setStatus("unauthorized");
      }
    }

    checkAuth();
  }, []);

  if (status === "loading") {
    return <p>Checking authentication...</p>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;