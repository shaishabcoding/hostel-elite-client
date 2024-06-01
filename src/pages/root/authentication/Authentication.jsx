import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignUp, githubSignUp } = useAuth();
  return (
    <div className="m-4 p-6 lg:mx-0 rounded-lg lg:pb-10 border  bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <div className="w-fit mx-auto">
        <Outlet />
        <div className="divider mt-0">OR</div>
        <div>
          <button
            className="btn flex items-center gap-2 text-sky-500 hover:text-white hover:bg-sky-500 bg-white rounded-lg border-2 border-sky-500 hover:border-0 w-full mb-4 dark:bg-gray-500 dark:border-gray-400 dark:text-sky-300"
            onClick={() => {
              googleSignUp(() => {
                toast.success("Google Sign In successfully");
                navigate(location?.state ?? "/");
              });
            }}
          >
            <FaGoogle /> Login with Google
          </button>
        </div>
        <div>
          <button
            className="btn flex items-center gap-2 text-gray-700 hover:text-white hover:bg-gray-700 bg-white rounded-lg border-2 border-gray-700 hover:border-0 w-full dark:bg-gray-500 dark:border-gray-400 dark:text-white"
            onClick={() => {
              githubSignUp(() => {
                toast.success("Github Sign In successfully");
                navigate(location?.state ?? "/");
              });
            }}
          >
            <FaGithub /> Login with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
