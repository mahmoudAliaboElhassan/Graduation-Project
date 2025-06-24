import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Toolbar, Typography } from "@mui/material";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardContent } from "./DashboardContent";
import UseDirection from "../../hooks/use-direction";
import { Outlet, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#7b1fa2",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const { direction } = UseDirection();
  const isRTL = direction.direction === "rtl";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  const handleItemClick = (item: string, path: string) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          direction: direction.direction,
        }}
      >
        <AdminSidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <AdminHeader onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              maxWidth: "100%",
              [isRTL ? "marginRight" : "marginLeft"]: sidebarOpen
                ? "288px"
                : "64px",
              transition: "margin 0.3s ease-in-out",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
