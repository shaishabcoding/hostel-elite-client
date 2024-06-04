import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import useTabMeals from "../../../../hooks/useTabMeals";
import Loading from "../../../../components/Loading";
import "react-tabs/style/react-tabs.css";
import MealCard from "./MealCard";

const Categories = () => {
  const [breakfastMeal, , breakfastLoading] = useTabMeals("Breakfast");
  const [lunchMeal, , lunchLoading] = useTabMeals("Lunch");
  const [dinnerMeal, , dinnerLoading] = useTabMeals("Dinner");
  const [allMeal, , allLoading] = useTabMeals("All");
  return (
    <div className="p-2 lg:p-0 mb-4 lg:my-20 mt-4">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Categories
      </h2>
      <Tabs>
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>All</Tab>
        </TabList>
        <TabPanel>
          {breakfastLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breakfastMeal?.map((meal) => (
                <MealCard meal={meal} key={meal._id} />
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel>
          {lunchLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lunchMeal?.map((meal) => (
                <MealCard meal={meal} key={meal._id} />
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel>
          {dinnerLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dinnerMeal?.map((meal) => (
                <MealCard meal={meal} key={meal._id} />
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel>
          {allLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allMeal?.map((meal) => (
                <MealCard meal={meal} key={meal._id} />
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Categories;
