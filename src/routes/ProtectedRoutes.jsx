import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ allowedRoles }) {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!user.isEmailVerified) {
        return <Navigate to="/login" replace />;
    }
    if (user.onboardingRequired) {
        return <Navigate to="/" replace />;
    }
    if (allowedRoles && !allowedRoles.some((role) => user.roles.includes(role))) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
