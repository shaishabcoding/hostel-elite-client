import axios from "axios";

const publicClient = axios.create({
  baseURL: "http://localhost:5000",
});

const usePublicClient = () => {
  return publicClient;
};

export default usePublicClient;
