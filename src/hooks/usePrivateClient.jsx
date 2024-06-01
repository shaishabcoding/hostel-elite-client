import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const privateClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const usePrivateClient = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  privateClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  privateClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/authentication/login");
      }
      return Promise.reject(error);
    }
  );
  return privateClient;
};

export default usePrivateClient;
