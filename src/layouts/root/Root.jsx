import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h2>this is root</h2>
      <Outlet />
    </div>
  );
};

export default Root;
