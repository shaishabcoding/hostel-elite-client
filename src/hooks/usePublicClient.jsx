import axios from "axios";

const publicClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const usePublicClient = () => {
  return publicClient;
};

export default usePublicClient;
