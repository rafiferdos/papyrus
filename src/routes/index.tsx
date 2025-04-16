import DashboardHome from "@/components/dashboard/DashboardHome";
import DashboardLayout from "@/layouts/DashboardLayout";
import ManageOrders from "@/pages/Dashboard/Admin/orders/ManageOrders";
import AddProduct from "@/pages/Dashboard/Admin/products/AddProduct";
import ManageProducts from "@/pages/Dashboard/Admin/products/ManageProducts";
import UpdateProduct from "@/pages/Dashboard/Admin/products/UpdateProduct";
import ManageUsers from "@/pages/Dashboard/Admin/user/ManageUsers";
import Orders from "@/pages/Dashboard/User/orders/Orders";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/layouts/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import AllProductsPage from "@/pages/AllProductsPage";
import SingleProduct from "@/pages/SingleProductPage";
import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "@/pages/ShoppingCart";
import Checkout from "@/pages/Checkout";
import About from "@/pages/About";
// import Profile from "@/pages/Dashboard/User/profile/Profile";
import MyProfilePage from "@/pages/profile/MyProfile";
import OrderVerification from "@/pages/VerifyOrder";
import OrderDetails from "@/pages/Order";
import ErrorPage from "@/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "products",
        element: <AllProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <SingleProduct />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order/verify",
        element: <OrderVerification />,
      },
      {
        path: "/order",
        element: <OrderDetails />,
      },
    ],
  },

  //* shoyon add this
  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    // errorElement: <ErrorElement />,
    children: [
      { index: true, element: <DashboardHome /> },
      // { path: "home", element: <DashboardHome /> },
      //! admin route
      {
        path: "admin/manage-orders",
        element: (
          <PrivateRoute requireAdmin={true}>
            <ManageOrders />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://papyrus-server-lovat.vercel.app/api/order"),
      },
      // end orders
      {
        path: "admin/manage-products",
        element: (
          <PrivateRoute requireAdmin={true}>
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/add-product",
        element: (
          <PrivateRoute requireAdmin={true}>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/update-product/:productId",
        element: (
          <PrivateRoute requireAdmin={true}>
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://papyrus-server-lovat.vercel.app/api/product/${params.productId}`
          ),
      },
      // end products
      { path: "admin/manage-users", element: <ManageUsers /> },
      // user
      //! user route
      { path: "/dashboard/user/orders", element: <Orders /> },
      { path: "/dashboard/user/profile", element: <MyProfilePage /> },
      // { path: "/dashboard/user/profile", element: <MyProfilePage /> },
    ],
  },
]);

{
  /* <ProtectedRoute requireAdmin={true}>
<DashboardLayout />
</ProtectedRoute> */
}

export default router;
