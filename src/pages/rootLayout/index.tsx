import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import UseDirection from "../../hooks/use-direction";
import UseMediaQuery from "../../hooks/use-media-query";
import Scroll from "../../components/scroll";
import { MainContent, PageWrapper } from "../../styles/footer";
import { logOut } from "../../state/slices/auth";
import { useMediaQuery } from "@mui/material";

function RootLayout() {
  const { mymode } = useAppSelector((state) => state.mode);
  const { direction } = UseDirection();

  const { expirationToken, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.auth);
  const handleTokenExpiration = useCallback(() => {
    dispatch(logOut());
    toast.error(
      t("session-expired", "Your session has expired. Please log in again.")
    );
  }, [dispatch, t]);

  const checkTokenExpiration = useCallback(() => {
    if (!token || !expirationToken) {
      return;
    }

    const now = new Date();
    const expiration = new Date(expirationToken);

    // Check if token has expired
    if (now >= expiration) {
      console.log(t("token-expired-log", "Token expired - triggering logout"));
      handleTokenExpiration();
      return;
    }

    // Calculate time until expiration
    const timeUntilExpiration = expiration.getTime() - now.getTime();
    console.log(
      t("time-until-expiration-log", "Time until expiration (minutes):"),
      timeUntilExpiration / (60 * 1000)
    );

    // If token expires in less than 5 minutes, show warning
    const fiveMinutes = 5 * 60 * 1000;
    if (timeUntilExpiration <= fiveMinutes && timeUntilExpiration > 0) {
      console.log(
        t("showing-expiration-warning-log", "Showing expiration warning")
      );
      toast.warning(
        t(
          "session-expiring-soon",
          "Your session will expire soon. Please save your work."
        )
      );
    }
  }, [token, expirationToken, handleTokenExpiration, t]);
  const isVerySmallScreen = useMediaQuery("(max-width:400px)");

  useEffect(() => {
    // Only check if user is logged in
    if (!token) return;

    // Initial check
    checkTokenExpiration();

    // Set up interval to check every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [token, checkTokenExpiration]);

  // Also check on window focus (when user returns to tab)
  useEffect(() => {
    if (!token) return;

    const handleWindowFocus = () => {
      checkTokenExpiration();
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [token, checkTokenExpiration]);

  const location = useLocation();
  console.log(
    t("current-location-log", "Current location pathname:"),
    location.pathname
  );
  useEffect(() => {
    document.title = t("website-title");
    const htmlElement = document.documentElement;
    if (mymode && mymode === "light") {
      htmlElement.classList.remove("dark-mode");
      htmlElement.classList.add("light-mode");
    } else {
      htmlElement.classList.remove("light-mode");
      htmlElement.classList.add("dark-mode");
    }
  }, [t]);

  const thema = createTheme({
    direction: direction.direction,
    palette: {
      mode: mymode,
    },
  });

  return (
    <ThemeProvider theme={thema}>
      <div
        className={mymode === "light" ? "light-mode" : "dark-mode"}
        style={{
          // minHeight: "100vh",
          color: "white",
          backgroundImage:
            mymode === "light"
              ? "linear-gradient(to top, #c31432, #240b36)"
              : "linear-gradient(0deg, #1a1a2e, #4b000f)",
        }}
      >
        <PageWrapper>
          <Header />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={mymode}
          />
          <div
            style={{
              height: isVerySmallScreen && role === "Student" ? "92px" : "56px",
            }}
          ></div>

          {/* AnimatePresence with unique key for page transitions */}
          {location.pathname !== "/" ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction.direction === "ltr" ? -50 : 50,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          ) : (
            <MainContent>
              <Outlet />
            </MainContent>
          )}
        </PageWrapper>
        <Scroll />
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default RootLayout;
