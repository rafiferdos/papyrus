import MainLayout from "@/layouts/MainLayout";
<<<<<<< HEAD
import PrivateRoute from "@/layouts/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import MyProfile from "@/pages/profile/MyProfile";
=======
import AllProductsPage from "@/pages/AllProductsPage";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import SingleProduct from "@/pages/SingleProductPage";
>>>>>>> a1eace4dd46347d6998ca2571b5728bb9b9002c1
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
<<<<<<< HEAD
        path: '/profile',
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login></Login>,
=======
        path: "products",
        element: <AllProductsPage />,
      },
      {
        path: "api/products/:productId",
        element: <SingleProduct />,
>>>>>>> a1eace4dd46347d6998ca2571b5728bb9b9002c1
      },
      {
        path: "register",
        element: <Register />,
      },
<<<<<<< HEAD
    ]
  }
])
        
//     ],
//   },
// ]);
=======
      { path: "/login", element: <Login></Login> },
    ],
  },
]);
>>>>>>> a1eace4dd46347d6998ca2571b5728bb9b9002c1

//if protectedRoute need use <ProtectedRoute><ProtectedRoute/>
//if protectedRoute with admin requre need use <ProtectedRoute={true}><ProtectedRoute/>
//example:
{
  /* <ProtectedRoute requireAdmin={true}>
<DashboardLayout />
</ProtectedRoute> */
}

export default router;
