import React, { lazy } from "react";
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"))
const Products = lazy(() => import("../pages/Products"))
const ProductView = lazy(() => import("../pages/ProductView"))
const CategoryPage = lazy(() => import("../pages/CategoryPage"))
const AiTools = lazy(() => import("../pages/AI/AiTools"))
const ExchangeProducts = lazy(() => import("../pages/ExchangeProducts"))
const AdminPortal = lazy(() => import("../pages/admin/AdminPortal"))
const ManageProducts = lazy(() => import("../pages/admin/ManageProducts"))
const ExchangeRequests = lazy(() => import("../pages/admin/ExchangeRequests"))
const UserManagement = lazy(() => import("../pages/admin/UserManagement"))
const Checkout = lazy(() => import("../components/Checkout"))
const PackingAssistant = lazy(() => (import("../components/PackingAssistant")))
const VirtualTryOn = lazy(() => (import("../components/VirtualTryOn")))

const PublicRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductView />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/ai-tools",
    element: <AiTools />,
  },
  {
    path: "/exchange-product",
    element: <ExchangeProducts />,
  },
  {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: "/packing-assistant",
    element: <PackingAssistant />,
  },
  {
    path: "/virtual-try-on",
    element: <VirtualTryOn />,
  }
];

// const UserRoute = [
//   {
//     path: "/",
//     element: <Home />,
//   },
// ];

const AdminRoute = [
  {
    path: "/admin/dashboard",
    element: <AdminPortal />,
  },
  {
    path: "/admin/products",
    element: <ManageProducts />,
  },
  {
    path: "/admin/exchange-requests",
    element: <ExchangeRequests />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  }
];

export {
   PublicRoute, 
  //  UserRoute, 
   AdminRoute 
  };
