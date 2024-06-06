import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const usePayHistory = () => {
  const { user, loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["payHistory", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/payment/history`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default usePayHistory;
