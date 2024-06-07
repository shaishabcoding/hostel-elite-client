import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useServeMeals = () => {
  const { loading, user } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["serveMeals", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/serve`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useServeMeals;
