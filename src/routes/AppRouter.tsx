import React, { Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../pages/rootLayout";
import ErrorPage from "../pages/error";
import HomePage from "../pages/home";
import Loader from "../components/loader";
const Login = React.lazy(() => import("../pages/auth/login"));
const Signup = React.lazy(() => import("../pages/auth/signup"));
const ChangePassword = React.lazy(
  () => import("../pages/auth/change-password")
);
const Contacts = React.lazy(() => import("../pages/contacts"));
const About = React.lazy(() => import("../pages/about"));
const FiveHints = React.lazy(() => import("../pages/game/fiveHints"));
const Games = React.lazy(() => import("../pages/game"));
const Offside = React.lazy(() => import("../pages/game/offside"));
const GetQuestions = React.lazy(
  () => import("../pages/game/fiveHints/get-questions")
);

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
            <HomePage />
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
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />{" "}
          </Suspense>
        ),
      },
      {
        path: "/contacts",
        element: (
          <Suspense fallback={<Loader />}>
            <Contacts />{" "}
          </Suspense>
        ),
      },
      {
        path: "/change-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ChangePassword />{" "}
          </Suspense>
        ),
      },
      {
        path: "/games",
        element: (
          <Suspense fallback={<Loader />}>
            <Games />{" "}
          </Suspense>
        ),
      },
      {
        path: "/five-hints",
        element: (
          <Suspense fallback={<Loader />}>
            <FiveHints />{" "}
          </Suspense>
        ),
      },
      {
        path: "/offside",
        element: (
          <Suspense fallback={<Loader />}>
            <Offside />{" "}
          </Suspense>
        ),
      },
      {
        path: "/get-questions/:gameType",
        element: (
          <Suspense fallback={<Loader />}>
            <GetQuestions />{" "}
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