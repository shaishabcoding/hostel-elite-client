import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get("/users/admin");
      return res.data?.admin;
    },
  });
  return [data, isPending];
};

export default useAdmin;
