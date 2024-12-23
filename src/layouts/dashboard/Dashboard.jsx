import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Loading from "../../components/Loading";
import SideBar from "./components/SideBar";
import { NavLink } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const [isAdmin] = useAdmin();

  const links = isAdmin ? (
    <ul className="menu menu-sm lg:menu-md">
      <li>
        <NavLink to="/dashboard/profile">Admin Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/new">Add Meal</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">All Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/reviews">All Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/serve">Serve Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/upcoming">Upcoming Meals</NavLink>
      </li>
    </ul>
  ) : (
    <ul className="menu menu-sm lg:menu-md">
      <li>
        <NavLink to="/dashboard/profile">My Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/request">Requested Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/reviews/my">My Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment/history">Payment History</NavLink>
      </li>
    </ul>
  );

  return (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="md:hidden">
        <Navbar links={links} />
      </div>
      <div className="lg:px-28 md:h-screen flex flex-row lg:py-6 lg:gap-6">
        {/* <Navbar></Navbar>
        {loading && <Loading></Loading>}
        <Outlet></Outlet> */}
        <div className="w-96 md:w-72 hidden md:block bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 h-full lg:rounded-lg">
          <SideBar links={links} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="h-full w-full p-2 lg:p-0">
            <div className="h-full w-full md:overflow-auto p-2 lg:p-6 pt-6 px-2 pb-2 lg:mx-0 rounded-lg border bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
              <Outlet className="grow" />
            </div>
          </div>
        )}
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Dashboard;
