import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useUsers = (query) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["users", query],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/users?query=${query}`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useUsers;
