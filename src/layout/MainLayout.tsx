import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import NavLayout from "../pages/NavLayout";
import ProductPage from "../pages/ProductPage";
import ProductDetails from "../pages/DetailsProduct";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";
import CookieService from "../services/CookieService";
import DashboardLayout from "../components/Dashboard/Layouts/DashLayout";
import Dashboard from "../pages/Dashboard";
import DashboardProducts from "../pages/DashboardProducts";
import DashboardCategories from "../pages/DashboardCategories";
import DashboardSettings from "../pages/DashboardSettings";

const token = CookieService.get("jwt");

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "categories",
        element: <DashboardCategories />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage isAuthenticated={token} />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage isAuthenticated={token} />,
  },
]);

const MainLayout = () => {
  return <RouterProvider router={router} />;
};

export default MainLayout;
