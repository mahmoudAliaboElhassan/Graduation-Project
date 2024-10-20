import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../../components/header";
import { useAppSelector } from "../../hooks/redux";
import UseDirection from "../../hooks/use-direction";

function RootLayout() {
  const { mymode } = useAppSelector((state) => state.mode);
  const { direction } = UseDirection();

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
        <div style={{ height: "32px" }}></div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
