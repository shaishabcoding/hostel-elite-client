import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to="/authentication/login"></Navigate>
  );
};
export default PrivateRoute;
