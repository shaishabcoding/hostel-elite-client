import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import usePrivateClient from "../../../hooks/usePrivateClient";
import MealCard from "../home/components/MealCard";
import Loading from "../../../components/Loading";
import { useState } from "react";

const AllMeals = () => {
  const privateClient = usePrivateClient();
  const [category, setCategory] = useState(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const getMeals = async ({ pageParam = 0 }) => {
    const { data } = await privateClient(
      `/meals?limit=10&offset=${pageParam}&category=${
        category || "All"
      }&minPrice=${min}&maxPrice=${max}`
    );

    return { ...data, prevOffset: pageParam };
  };

  const { data, isLoading, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["mealsAll", category, min, max],
      queryFn: getMeals,
      getNextPageParam: (lastPage) =>
        lastPage.prevOffset + 10 > lastPage.mealsCount
          ? false
          : lastPage.prevOffset + 10,
    });

  const meals = data?.pages.flatMap((page) => page.meals);

  return (
    <div className="my-1 px-2 md:px-4 lg:rounded-lg lg:mt-6 lg:mb-10 md:py-10 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-12 pt-6 md:pt-0 md:text-4xl lg:mb-8 lg:text-5xl font-semibold text-center mb-6">
        All Meals
      </h2>
      {(isLoading || isPending) && <Loading />}
      <div className="flex items-center justify-center gap-4 mb-4 lg:mb-8">
        <div className="join">
          <div>
            <div>
              <input
                onBlur={(e) => {
                  setMin(+e.target.value);
                }}
                className="input w-20 input-bordered join-item"
                placeholder="Min"
              />
            </div>
          </div>
          <div>
            <div>
              <input
                onBlur={(e) => {
                  setMax(+e.target.value);
                }}
                className="input w-20 input-bordered join-item"
                placeholder="Max"
              />
            </div>
          </div>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            defaultValue="default"
            className="select select-bordered join-item"
          >
            <option disabled value="default">
              Categories
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data?.pages[0].mealsCount || 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<Loading />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals?.map((meal, idx) => (
            <MealCard key={idx} meal={meal} url="/meal/" />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllMeals;
