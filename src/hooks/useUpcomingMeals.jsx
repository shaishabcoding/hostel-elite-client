import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useUpcomingMeals = (sort) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["upcomingMeals"],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/upcoming?sort=${sort}`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useUpcomingMeals;
