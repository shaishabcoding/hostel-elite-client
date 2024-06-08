import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { CiDark, CiLight } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import { IoNotificationsSharp } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");

    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/meals/all">Meals</NavLink>
          </li>
          <li>
            <NavLink to="/meals/upcoming">Upcoming Meals</NavLink>
          </li>
          <li>
            <NavLink
              className="flex items-center justify-center h-full"
              to="/books/borrowed"
            >
              <IoNotificationsSharp className="text-[1.2em]" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/books/my">My Books</NavLink>
          </li>
        </>
      ) : (
        <>
          <div className="md:hidden">
            <li>
              <NavLink to="/authentication/login">Join Us</NavLink>
            </li>
          </div>
        </>
      )}
    </>
  );
  return (
    <nav
      id="sidebar"
      className="navbar bg-gradient-to-r from-green-50  dark:from-gray-600 via-pink-50 dark:via-gray-700 to-sky-50 dark:to-gray-600 dark:text-white lg:rounded-lg"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu mt-4 z-50 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 menu-sm dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-base font-bold md:px-4 px-0 md:text-xl"
        >
          <span className="flex gap-1 lg:gap-2 items-center">
            <img className="w-[1.5em] dark:invert" src="/logo.png" /> Hostel
            Elite
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex items-center">
        <div className="dropdown dropdown-bottom dropdown-end mr-2">
          <button
            onClick={toggleDarkMode}
            className="btn m-1 text-3xl btn-ghost dark:hover:bg-gray-500 p-2 rounded-full"
          >
            {isDarkMode ? <CiDark /> : <CiLight />}
          </button>
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                role="button"
                src={user?.photoURL}
                className="w-10 lg:w-12 aspect-square object-center mr-2 md:mr-4 rounded-full ring-4 ring-sky-500 dark:ring-gray-400"
              />
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500"
              >
                <span className="mx-4 mt-2 font-bold">{user?.displayName}</span>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <button
                  className="btn btn-sm text-xs p-0 bg-white dark:bg-gray-500 dark:border-gray-400 dark:text-white"
                  onClick={logOut}
                >
                  Logout <HiOutlineLogout />
                </button>
              </ul>
            </div>
          </>
        ) : (
          <div className="hidden md:flex gap-2">
            <NavLink
              to="/authentication/login"
              className="btn bg-white dark:bg-gray-500 dark:border-gray-400 dark:text-white"
            >
              Join Us <FiLogIn />
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
