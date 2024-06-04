import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Membership from "./components/Membership";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      {/* todo: add 2 section */}
      <Membership />
    </div>
  );
};

export default Home;
