import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth();
  const [isShowPass, setIsShowPass] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = handleSubmit(({ email, password }) => {
    if (!/[A-Z]/.test(password)) {
      toast.error("Must have an Uppercase letter in the password");
    } else if (!/[a-z]/.test(password)) {
      toast.error("Must have a Lowercase letter in the password");
    } else {
      logIn({ email, password }, () => {
        toast.success("Account Logged in successfully");
        navigate(location?.state ?? "/");
      });
    }
  });

  return (
    <div className="w-fit mx-auto">
      <h2 className="text-2xl lg:mt-8 lg:text-5xl lg:mb-12 font-semibold text-center mb-6">
        Welcome back
      </h2>
      <form className="grid w-full gap-4" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Enter your email"
            required
            {...register("email")}
          />
        </label>
        <div className="join flex">
          <label className="input grow input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 join-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isShowPass ? "text" : "password"}
              className="grow"
              placeholder="Enter your password"
              required
              minLength="6"
              maxLength="20"
              {...register("password")}
            />
          </label>
          <button
            className="btn join-item text-2xl px-2 border border-gray-300 dark:bg-gray-400 dark:border-gray-400 dark:text-white"
            onClick={(e) => {
              e.preventDefault();
              setIsShowPass(!isShowPass);
            }}
          >
            {isShowPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="btn w-full btn-primary dark:bg-blue-800 dark:border-gray-400"
          >
            Login <FiLogIn />
          </button>
        </div>
      </form>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link
          className="btn btn-link p-0 dark:text-blue-300"
          to="/authentication/register"
          state={location?.state}
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;