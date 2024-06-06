import { createBrowserRouter } from "react-router-dom";
import Authentication from "../pages/root/authentication/Authentication";
import Login from "../pages/root/authentication/pages/Login";
import Register from "../pages/root/authentication/pages/Register";
import Root from "../layouts/root/Root";
import Home from "../pages/root/home/Home";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../layouts/dashboard/Dashboard";
import AddMeal from "../pages/dashboard/admin/meals/AddMeal";
import AllMeals from "../pages/dashboard/admin/meals/AllMeals";
import UpdateMeal from "../pages/dashboard/admin/meals/UpdateMeal";
import AllReviews from "../pages/dashboard/admin/AllReviews";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import Profile from "../pages/dashboard/Profile";
import MealDetails from "../pages/root/meals/MealDetails";
import Checkout from "../pages/root/checkout/Checkout";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import MyReviews from "../pages/dashboard/user/MyReviews";

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
      {
        path: "meal/:id",
        element: <MealDetails />,
      },
      {
        path: "checkout/:pkgName",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //user dashboard
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "reviews/my",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      // admin dashboard
      {
        path: "meals/new",
        element: (
          <AdminRoute>
            <AddMeal />
          </AdminRoute>
        ),
      },
      {
        path: "meals/edit/:id",
        element: (
          <AdminRoute>
            <UpdateMeal />
          </AdminRoute>
        ),
      },
      {
        path: "meals/all",
        element: (
          <AdminRoute>
            <AllMeals />
          </AdminRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <AdminRoute>
            <AllReviews />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
