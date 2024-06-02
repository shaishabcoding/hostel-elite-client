import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useMeals = () => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isPending } = useQuery({
    queryKey: ["meals"],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get("/meals");
      return res.data;
    },
  });
  return [data, refetch, isPending];
};

export default useMeals;
