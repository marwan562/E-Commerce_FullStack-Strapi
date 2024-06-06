import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import NavLayout from "../pages/NavLayout";
import ProductPage from "../pages/ProductPage";
import ProductDetails from "../pages/DetailsProduct";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";

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
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },
]);

const MainLayout = () => {
  return <RouterProvider router={router} />;
};

export default MainLayout;
