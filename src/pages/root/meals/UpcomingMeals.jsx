import useUpcomingMeals from "../../../hooks/useUpcomingMeals";
import MealCard from "../home/components/MealCard";

const UpcomingMeals = () => {
  const [meals] = useUpcomingMeals();
  return (
    <div className="lg:p-6 pt-6 px-2 pb-2 lg:mx-0 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-0 lg:mb-8 lg:text-5xl font-semibold text-center mb-4">
        Upcoming Meals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals?.map((meal) => (
          <MealCard meal={meal} url="/meal/upcoming/" key={meal._id} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
