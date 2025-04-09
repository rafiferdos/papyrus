import DashboardHome from "@/components/dashboard/DashboardHome";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import ManageOrders from "@/pages/Dashboard/Admin/orders/ManageOrders";
import ManageProducts from "@/pages/Dashboard/Admin/products/ManageProducts";
import ManageUsers from "@/pages/Dashboard/Admin/user/ManageUsers";
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
      { path: "/dashboard/admin/manage-products", element: <ManageProducts /> },
      { path: "/dashboard/admin/manage-users", element: <ManageUsers /> },
      //! user route
      // { path: "/dashboard/manage-orders", element: <ManageOrders /> },
      // { path: "/dashboard/manage-products", element: <ManageProducts /> },
      // { path: "/dashboard/manage-users", element: <ManageUsers /> },
    ],
  },
]);

export default router;
