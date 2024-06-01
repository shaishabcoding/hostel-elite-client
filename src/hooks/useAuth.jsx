import { useContext } from "react";
import { AuthContext } from "../providers/auth/AuthProvider";

const useAuth = () => useContext(AuthContext);
export default useAuth;
