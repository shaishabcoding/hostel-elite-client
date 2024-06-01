const SideBar = ({ links }) => {
  return (
    <div id="sidebar2">
      <h1 className="text-2xl font-bold px-4 pt-5 flex gap-1">
        <img className="w-[1.5em] dark:invert" src="/logo.png" />
        Hostel Elite
      </h1>
      {links}
    </div>
  );
};

export default SideBar;
