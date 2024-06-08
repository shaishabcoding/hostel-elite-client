import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useMeals = (sort) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["meals"],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals?sort=${sort}`);
      return res.data.meals;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useMeals;
