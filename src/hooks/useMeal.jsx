import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useMeal = (id) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch } = useQuery({
    queryKey: ["meal", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/${id}`);
      return res.data;
    },
  });
  return [data, refetch];
};

export default useMeal;
