import React, { lazy } from "react";
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"))
const Products = lazy(() => import("../pages/Products"))
const ProductView = lazy(() => import("../pages/ProductView"))
const CategoryPage = lazy(() => import("../pages/CategoryPage"))

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
];

const UserRoute = [
  {
    path: "/",
    element: <Home />,
  },
];

// const AdminRoute = [
//   {
//     path: "/admin",
//     element: <Dashboard />,
//   },
//   {
//     path: "/community",
//     element: <Community />,
//   },
//   {
//     path: "/posts",
//     element: <Posts />,
//   },
//   {
//     path: "/contentModeration",
//     element: <ContentModeration />,
//   },
//   {
//     path: "/createGroup",
//     element: <CreateGroup />,
//   },
//   {
//     path: "/groupchat",
//     element: <GroupChat />,
//   },
//   {
//     path: "/groups",
//     element: <Groups/>
//   }
// ];

export {
   PublicRoute, 
   UserRoute, 
  //  AdminRoute 
  };
