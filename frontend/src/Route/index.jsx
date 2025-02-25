import React, { lazy } from "react";
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"))

const PublicRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/Welcome",
  //   element: <Landing />,
  // },
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
