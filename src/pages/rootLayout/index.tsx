import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { useAppSelector } from "../../hooks/redux";
import UseDirection from "../../hooks/use-direction";
import UseMediaQuery from "../../hooks/use-media-query";

function RootLayout() {
  const { mymode } = useAppSelector((state) => state.mode);
  const { direction } = UseDirection();
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 360px)" });
  const { t } = useTranslation();
  const location = useLocation(); // Track route changes
console.log("location.pathname",location.pathname)
  useEffect(() => {
    document.title = t("website-title");
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
        style={{
          // minHeight: "100vh",
          color: "white",
          backgroundImage:
            mymode === "light"
              ? "linear-gradient(0deg, #E52220, #013c74)"
              : "linear-gradient(0deg, #1a1a2e, #4b000f)",
        }}
      >
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
        <div style={{ height:"56px" }}></div>

        {/* AnimatePresence with unique key for page transitions */}
        {location.pathname !== "/" ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction.direction === "ltr" ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default RootLayout;
