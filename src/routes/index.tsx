
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/layouts/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
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
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register />,
      },
    ]
  }
])
        
//     ],
//   },
// ]);

//if protectedRoute need use <ProtectedRoute><ProtectedRoute/>
//if protectedRoute with admin requre need use <ProtectedRoute={true}><ProtectedRoute/>
//example:
{/* <ProtectedRoute requireAdmin={true}>
<DashboardLayout />
</ProtectedRoute> */}

export default router;
