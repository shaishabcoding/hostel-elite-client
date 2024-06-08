import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Faq from "./components/Faq";
import Membership from "./components/Membership";
import NewsLetter from "./components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Membership />
      <Faq />
      <NewsLetter />
    </div>
  );
};

export default Home;
