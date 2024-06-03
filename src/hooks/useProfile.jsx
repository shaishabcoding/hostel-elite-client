import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useProfile = () => {
  const { user, loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/users/profile`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useProfile;
