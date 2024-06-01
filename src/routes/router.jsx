import { createBrowserRouter } from "react-router-dom";
import Authentication from "../pages/root/authentication/Authentication";
import Login from "../pages/root/authentication/pages/Login";
import Register from "../pages/root/authentication/pages/Register";
import Root from "../layouts/root/Root";
import Home from "../pages/root/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "authentication",
        element: <Authentication />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
