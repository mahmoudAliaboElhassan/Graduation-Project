import React, { Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../pages/rootLayout";
import ErrorPage from "../pages/error";
import HomePage from "../pages/home";
import Loader from "../components/loader";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />{" "}
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />{" "}
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <Signup />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
