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
        <NavLink to="/dashboard/meals/all2">Admin Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/new">Add Meal</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">All Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">All Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">Serve Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">Upcoming Meals</NavLink>
      </li>
    </ul>
  ) : (
    <ul className="menu menu-sm lg:menu-md">
      <li>
        <NavLink to="/dashboard/meals/all2">My Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">Requested Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">My Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all2">Payment History</NavLink>
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
          <div className="h-full w-full md:overflow-auto p-2 lg:p-0">
            <Outlet className="grow" />
          </div>
        )}
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Dashboard;
