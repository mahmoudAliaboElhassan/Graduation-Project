import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  School,
  Grade,
  MenuBook,
  Quiz,
  SportsEsports,
  Person,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import UseDirection from "../../hooks/use-direction";
import UseAdminDashboard from "../../hooks/use-admin-dashboard";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string, path: string) => void;
}

export function AdminSidebar({
  isOpen,
  onToggle,
  activeItem,
  onItemClick,
}: SidebarProps) {
  const { direction } = UseDirection();
  const isRTL = direction.direction === "rtl";
  const { menuItems } = UseAdminDashboard();

  return (
    <Drawer
      variant="permanent"
      anchor={isRTL ? "right" : "left"}
      sx={{
        width: isOpen ? 288 : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 288 : 64,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          background: "linear-gradient(180deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 40, height: 40 }}
            >
              <Dashboard />
            </Avatar>
            {isOpen && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Admin Panel
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Management System
                </Typography>
              </Box>
            )}
          </Box>
          {isOpen && (
            <IconButton onClick={onToggle} sx={{ color: "white", p: 0.5 }}>
              {isRTL ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Navigation */}
        <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.text;

            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => onItemClick(item.text, item.path)}
                  sx={{
                    borderRadius: 2,
                    minHeight: 44,
                    justifyContent: isOpen ? "initial" : "center",
                    px: 2,
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                  selected={isActive}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: "white",
                        "& .MuiTypography-root": {
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* User Profile */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 40, height: 40 }}
            >
              <Person />
            </Avatar>
            {isOpen && (
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Administrator
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
