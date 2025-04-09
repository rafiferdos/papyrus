import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import MyProfile from "@/pages/profile/MyProfile";
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
        path: '/profile',
        element: <MyProfile></MyProfile>,
      }
    ]
  }
])

export default router;