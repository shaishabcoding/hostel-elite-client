import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import usePrivateClient from "../../../hooks/usePrivateClient";
import MealCard from "../home/components/MealCard";
import Loading from "../../../components/Loading";

const AllMeals = () => {
  const privateClient = usePrivateClient();

  const getMeals = async ({ pageParam = 0 }) => {
    const { data } = await privateClient(`/meals?limit=10&offset=${pageParam}`);

    return { ...data, prevOffset: pageParam };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["mealsAll"],
    queryFn: getMeals,
    getNextPageParam: (lastPage) =>
      lastPage.prevOffset + 10 > lastPage.mealsCount
        ? false
        : lastPage.prevOffset + 10,
  });

  const meals = data?.pages.flatMap((page) => page.meals);

  return (
    <div className="lg:p-6 pt-6 px-2 pb-2 lg:mx-0 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-0 lg:mb-8 lg:text-5xl font-semibold text-center mb-4">
        All Meals
      </h2>
      <InfiniteScroll
        dataLength={data?.pages[0].mealsCount || 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<Loading />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals?.map((meal, idx) => (
            <MealCard key={idx} meal={meal} url="/meal/upcoming/" />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllMeals;
