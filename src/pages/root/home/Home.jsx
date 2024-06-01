import useAdmin from "../../../hooks/useAdmin";
import Banner from "./components/Banner";

const Home = () => {
  const [admin] = useAdmin();
  console.log(admin);
  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
