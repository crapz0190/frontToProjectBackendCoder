/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
// import { UseProducts } from "../context/ProductsContext";

const ProtectedRouteUser = () => {
  const { loading, isAuthenticated, userRole } = UseAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated && !userRole)
    return <Navigate to="/users/login" replace />;

  if (userRole !== "user") return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRouteUser;
