import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (isLoading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/"></Navigate>;
};
export default AdminRoute;
