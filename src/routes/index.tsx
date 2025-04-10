import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/layouts/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import MyProfile from "@/pages/profile/MyProfile";
import AllProductsPage from "@/pages/AllProductsPage";
import SingleProduct from "@/pages/SingleProductPage";
import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "@/pages/ShoppingCart";
import Checkout from "@/pages/Checkout";

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
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
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
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
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
