import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useUpcomingMeal = (id) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch } = useQuery({
    queryKey: ["upcomingMeal", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/upcoming/${id}`);
      return res.data;
    },
  });
  return [data, refetch];
};

export default useUpcomingMeal;
