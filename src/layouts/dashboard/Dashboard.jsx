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
        <NavLink to="/dashboard/meals/all">Admin Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/new">Add Meal</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">All Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">All Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">Serve Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">Upcoming Meals</NavLink>
      </li>
    </ul>
  ) : (
    <ul className="">
      <li>
        <NavLink to="/dashboard/meals/all">My Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">Requested Meals</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">My Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/meals/all">Payment History</NavLink>
      </li>
    </ul>
  );

  return (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="md:hidden">
        <Navbar links={links} />
      </div>
      <div className="lg:px-28 h-screen flex flex-row lg:py-6">
        {/* <Navbar></Navbar>
        {loading && <Loading></Loading>}
        <Outlet></Outlet> */}
        <div className="hidden md:block bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 h-full rounded-lg">
          <SideBar links={links} />
        </div>
        <Outlet className="grow" />
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Dashboard;
