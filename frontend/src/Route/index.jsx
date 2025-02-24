import React, { lazy } from "react";
import Community from "../Admin/partials/community/Community";
import Posts from "../Admin/partials/posts/Posts";
import { elements } from "chart.js";

const Login = lazy(() => import("../pages/Login"));

const PublicRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  // {
  //   path: "/Welcome",
  //   element: <Landing />,
  // },
];

// const UserRoute = [
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/messages",
//     element: <Messages />,
//   },
//   {
//     path: "/profile/:userId",
//     element: <Profile />,
//   },
//   {
//     path: "/reels",
//     element: <Reels />,
//   },
//   {
//     path: "/announcements",
//     element: <Announcements />,
//   },
//   {
//     path: "/notifications",
//     element: <Notifications />,
//   },
//   {
//     path:"/usergroups/groups",
//     element: <UserGroups/>
//   }
// ];

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
  //  UserRoute, AdminRoute 
  };
