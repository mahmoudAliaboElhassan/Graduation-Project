import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Avatar,
  Paper,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  MenuBook as ChapterIcon,
  Quiz as QuizIcon,
  SportsEsports as EntertainmentIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import UseAdminDashboard from "../../hooks/use-admin-dashboard";
import UseDirection from "../../hooks/use-direction";

const drawerWidth = 280;

// Root layout container
const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100vw",
  overflow: "hidden",
}));

// Main content area - always behaves like mobile (full width)
const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  maxWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  marginLeft: 0,
  marginRight: 0,
  width: "100%",
}));

// AppBar - always behaves like mobile (full width)
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `0 2px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  marginLeft: 0,
  marginRight: 0,
  width: "100%",
}));

// Content area below AppBar
const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  marginTop: theme.mixins.toolbar.minHeight,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  overflow: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}));

// Drawer with RTL/LTR support
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "direction",
})<{ direction: "ltr" | "rtl" }>(({ theme, direction }) => {
  const isRTL = direction === "rtl";

  return {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      borderLeft: isRTL ? `1px solid ${theme.palette.divider}` : "none",
      borderRight: !isRTL ? `1px solid ${theme.palette.divider}` : "none",
      boxShadow: isRTL
        ? `-4px 0 20px ${alpha(theme.palette.primary.main, 0.2)}`
        : `4px 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
      overflowX: "hidden",
    },
  };
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "direction",
})<{ direction: "ltr" | "rtl" }>(({ theme, direction }) => {
  const isRTL = direction === "rtl";

  return {
    margin: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    transition: "all 0.3s ease",
    "&:hover": {
      transform: isRTL ? "translateX(-4px)" : "translateX(4px)",
    },
    "&.Mui-selected": {
      borderLeft: !isRTL ? `4px solid ${theme.palette.primary.main}` : "none",
      borderRight: isRTL ? `4px solid ${theme.palette.primary.main}` : "none",
    },
  };
});

const WelcomeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  maxWidth: "800px",
  margin: "0 auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

// Separate containers for welcome page and outlet content
const WelcomeContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  minHeight: "100%",
});

// Outlet wrapper that centers its content
const OutletWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 0, // Allow flex item to shrink
  overflow: "auto",
  "& > *": {
    maxWidth: "100%",
  },
});

interface MenuItem {
  text: string;
  icon: string;
  path: string;
  badge?: string;
}

// Icon mapping
const iconMap: Record<string, React.ReactElement> = {
  DashboardIcon: <DashboardIcon />,
  SchoolIcon: <SchoolIcon />,
  GradeIcon: <GradeIcon />,
  ChapterIcon: <ChapterIcon />,
  QuizIcon: <QuizIcon />,
  EntertainmentIcon: <EntertainmentIcon />,
};

const AdminDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { menuItems } = UseAdminDashboard();
  const { direction } = UseDirection();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isRTL = direction.direction === "rtl";
  const currentLanguage = i18n.language;

  // Get the appropriate anchor position based on direction
  const drawerAnchor = isRTL ? "right" : "left";

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Always close drawer on navigation
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DrawerHeader>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
            }}
          >
            <DashboardIcon fontSize="small" />
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {t("common.admin_panel")}
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            "&:hover": {
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
            },
          }}
        >
          {/* Always show close chevron when drawer is open */}
          {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Box sx={{ flexGrow: 1, py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const fullPath =
              item.path === "" ? "/admin" : `/admin/${item.path}`;
            return (
              <ListItem key={item.text} disablePadding>
                <StyledListItemButton
                  selected={location.pathname === fullPath}
                  onClick={() => handleMenuItemClick(item.path)}
                  direction={direction.direction}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    {iconMap[item.icon] || <DashboardIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                </StyledListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <PersonIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {t("common.admin_user")}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {t("common.administrator")}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <LayoutRoot>
      <CssBaseline />

      {/* AppBar */}
      <StyledAppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              mr: isRTL ? 0 : 2,
              ml: isRTL ? 2 : 0,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "white",
              textAlign: "center",
            }}
          >
            {t("common.admin_dashboard")}
          </Typography>
        </Toolbar>
      </StyledAppBar>

      {/* Navigation Drawer - Always temporary/overlay */}
      <Box component="nav">
        <StyledDrawer
          variant="temporary"
          anchor={drawerAnchor}
          direction={direction.direction}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          {drawerContent}
        </StyledDrawer>
      </Box>
      <div style={{ marginTop: "60px" }}>
        {/* Main Content - Always full width */}
        <MainContent>
          <ContentArea>
            {location.pathname === "/admin" ? (
              <WelcomeContainer>
                <WelcomeCard elevation={0}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "primary.main",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <DashboardIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 2,
                    }}
                  >
                    {t("welcome.title")}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      fontWeight: 400,
                      opacity: 0.8,
                    }}
                  >
                    {t("welcome.subtitle")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t("welcome.description")}
                  </Typography>
                </WelcomeCard>
              </WelcomeContainer>
            ) : (
              <OutletWrapper>
                <Outlet />
              </OutletWrapper>
            )}
          </ContentArea>
        </MainContent>
      </div>
    </LayoutRoot>
  );
};

export default AdminDashboard;
