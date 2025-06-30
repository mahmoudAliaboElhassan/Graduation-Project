import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withGuard<T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> {
  const Wrapper: React.FC<T> = (props) => {
    const { token, role } = useAppSelector((state) => state.auth);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { category } = useParams();
    const authUserRoutes = ["/change-password"];
    const authNotUserRoutes = [
      "/login",
      "/signup",
      "/password-forget",
      "/password-reset", // This is a dynamic route. Consider handling it with a match.
    ];
    useEffect(() => {
      const isAuthUserRoute = authUserRoutes.includes(pathname);
      const isAuthNotUserRoute = authNotUserRoutes.some(
        (route) => pathname.split("/")[1] == route.split("/")[1]
      );

      // No token and accessing authenticated-only route
      if (!token && isAuthUserRoute) {
        navigate("/login");
      }

      // Token exists and accessing unauthenticated-only route
      if (token && isAuthNotUserRoute) {
        navigate("/");
      }

      if (!token) {
        if (
          pathname.startsWith("/games") ||
          pathname.startsWith("/entertainment-sections")
        ) {
          navigate("/login");
        }
      }

      if (
        (!token || (role !== "Teacher" && role !== "Admin")) &&
        category === "education"
      ) {
        if (
          pathname.startsWith("/make-offside") ||
          pathname.startsWith("/make-five-hints") ||
          pathname.startsWith("/make-difficulty")
        ) {
          navigate("/");
        }
      }

      if (!token || role !== "Teacher") {
        if (pathname.startsWith("/games/education")) {
          navigate("/");
        }
      }

      if (!token || role !== "Admin") {
        if (pathname.startsWith("/admin")) {
          navigate("/");
        }
      }
    }, [token, pathname, navigate]);

    return <Component {...props} />;
  };

  return Wrapper;
}

export default withGuard;
