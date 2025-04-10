import DashboardHome from "@/components/dashboard/DashboardHome";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import ManageOrders from "@/pages/Dashboard/Admin/orders/ManageOrders";
import AddProduct from "@/pages/Dashboard/Admin/products/AddProduct";
import ManageProducts from "@/pages/Dashboard/Admin/products/ManageProducts";
import ManageUsers from "@/pages/Dashboard/Admin/user/ManageUsers";
import Orders from "@/pages/Dashboard/User/orders/Orders";
import Profile from "@/pages/Dashboard/User/profile/Profile";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      // </ProtectedRoute>
      <DashboardLayout />
    ),
    // errorElement: <ErrorElement />,
    children: [
      { path: "/dashboard/home", element: <DashboardHome /> },
      //! admin route
      { path: "/dashboard/admin/manage-orders", element: <ManageOrders /> },
      // end orders
      { path: "/dashboard/admin/manage-products", element: <ManageProducts /> },
      { path: "/dashboard/admin/add-product", element: <AddProduct /> },
      // end products
      { path: "/dashboard/admin/manage-users", element: <ManageUsers /> },
      // user
      //! user route
      { path: "/dashboard/user/orders", element: <Orders /> },
      { path: "/dashboard/user/profile", element: <Profile /> },
    ],
  },
]);

export default router;
