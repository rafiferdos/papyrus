import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
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
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "register",
        element: <RegisterForm />,
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
