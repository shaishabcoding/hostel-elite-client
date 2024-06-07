/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);
  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 items-center justify-center p-10">
      <div className="flex-1 p-6 md:p-10 lg:p-20">
        <img
          src="https://i.ibb.co/Lpg4T3s/error.png"
          alt="404 img"
          className="w-full"
        />
      </div>
      <div className="flex-1 mr-4 md:mr-8 lg:mr-16">
        <div className="w-full">
          <h2 className="text-3xl font-bold">Oops! Page Not Found</h2>
          <p className="my-4">
            Lost in the stacks! The page you are looking for seems to have
            slipped through the pages. Explore our library's nooks and crannies,
            or reach out for assistance. Happy reading!
          </p>
          <Link
            to="/"
            className="btn btn-accent dark:bg-gray-700 dark:text-white dark:border-gray-400"
          >
            Back to homepage <BsArrowReturnRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
