import MainLayout from "@/layouts/MainLayout";
import AllProductsPage from "@/pages/AllProductsPage";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import SingleProduct from "@/pages/SingleProductPage";
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
      {
        path: "products",
        element: <AllProductsPage />,
      },
      {
        path: "api/products/:productId",
        element: <SingleProduct />,
      },
      {
        path: "register",
        element: <Register />,
      },
      { path: "/login", element: <Login></Login> },
    ],
  },
]);

//if protectedRoute need use <ProtectedRoute><ProtectedRoute/>
//if protectedRoute with admin requre need use <ProtectedRoute={true}><ProtectedRoute/>
//example:
{
  /* <ProtectedRoute requireAdmin={true}>
<DashboardLayout />
</ProtectedRoute> */
}

export default router;
