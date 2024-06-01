import { Link } from "react-router-dom";

const SideBar = ({ links }) => {
  return (
    <div id="sidebar2">
      <Link
        to="/"
        className="btn btn-ghost text-lg lg:text-2xl font-semibold lg:font-bold mt-2 px-4 lg:mb-2 lg:mt-4 flex gap-1"
      >
        <img className="w-[1.5em] dark:invert" src="/logo.png" />
        Hostel Elite
      </Link>

      {links}
    </div>
  );
};

export default SideBar;
