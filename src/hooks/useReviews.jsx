import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useReviews = () => {
  const { user, loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/users/reviews`);
      return res.data;
    },
  });
  return [data, refetch, isPending || isLoading];
};

export default useReviews;
