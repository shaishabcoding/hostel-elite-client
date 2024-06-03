import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useTabMeals = (category) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["meals", category],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/category/${category}`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useTabMeals;
