import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
    const token = localStorage.getItem("adminToken");

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;