import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import { useAppSelector } from "../../hooks/redux";
import UseDirection from "../../hooks/use-direction";
import UseMediaQuery from "../../hooks/use-media-query";

function RootLayout() {
  const { mymode } = useAppSelector((state) => state.mode);
  const { direction } = UseDirection();
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 360px)" });
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("website-title");
  });

  const thema = createTheme({
    direction: direction.direction,
    palette: {
      // primary: {
      //   main: Colors.primary,
      // },
      // secondary: {
      //   main: Colors.seconday,
      // },
      mode: mymode,
    },
  });
  return (
    <ThemeProvider theme={thema}>
      <div
        style={{
          minHeight: "100vh",
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
        <div style={{ height: isSmallScreen ? "100px" : "64px" }}></div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
