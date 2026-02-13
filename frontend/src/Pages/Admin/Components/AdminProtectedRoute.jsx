import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../API/api.js"; // adjust path if needed

const ProtectedAdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/admin/check-auth"); 
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Checking authentication...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;
