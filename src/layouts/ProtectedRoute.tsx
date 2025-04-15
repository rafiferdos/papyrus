import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "@/redux/Features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const user = useSelector(useCurrentUser);
  const token = useSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const location = useLocation();

  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (requireAdmin && user?.role !== "admin") {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
