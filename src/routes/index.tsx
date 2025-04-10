import MainLayout from "@/layouts/MainLayout";
import AllProductsPage from "@/pages/AllProductsPage";
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
        path: 'products',
        element: <AllProductsPage />,
      },
      {
        path: 'api/products/:productId',
        element: <SingleProduct />,
      },
    ]
  }
])

export default router;