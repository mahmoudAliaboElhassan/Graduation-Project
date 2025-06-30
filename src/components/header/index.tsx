import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UseHeaderElements from "../../hooks/use-header-elements";
import { useAppSelector } from "../../hooks/redux";
import logoImg from "../../assets/logo.jpg";
import Languages from "../lngs";
import Mode from "../mode";
import UseDebounce from "../../hooks/use-debounce";
import UseDirection from "../../hooks/use-direction";
import styles from "./style.module.css";

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isVerySmallScreen = useMediaQuery("(max-width:400px)");
  const { direction } = UseDirection();
  const { t } = useTranslation();
  const { userAuth, notUserAuth, headerElements } = UseHeaderElements();
  const { token } = useAppSelector((state) => state.auth);
  const authElements = token ? userAuth : notUserAuth;
  const { mymode } = useAppSelector((state) => state.mode);
  const location = useLocation();
  const [isAnimate, setIsAnimate] = UseDebounce(500);
  const { pumpCartQuantity } = styles;
  const { name, totalPoints, role } = useAppSelector((state) => state.auth);

  const quantityStyle = `${isAnimate ? pumpCartQuantity : ""}`;
  const isStudent = role === "Student";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  // Logo component
  const LogoComponent = ({ size = 40 }: { size?: number }) => (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img
        src={logoImg}
        alt="Logo"
        style={{
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
        }}
      />
    </Box>
  );

  // User info component
  const UserInfoComponent = ({
    compact = false,
    inDrawer = false,
  }: {
    compact?: boolean;
    inDrawer?: boolean;
  }) => {
    if (!token) return null;

    const textColor = inDrawer
      ? mymode === "light"
        ? "black  !important"
        : "white !important"
      : "white";

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: compact ? 0.5 : 1,
          flexWrap: compact ? "wrap" : "nowrap",
          justifyContent: compact ? "space-between" : "flex-start",
          width: compact ? "100%" : "auto",
          maxWidth: compact ? "none" : { xs: "120px", sm: "200px" },
        }}
      >
        {name && (
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: compact ? "none" : "120px",
              fontSize: compact ? "0.75rem" : { xs: "0.75rem", sm: "0.875rem" },
              flex: compact ? 1 : "none",
            }}
          >
            {name}
          </Typography>
        )}

        {totalPoints && isStudent && (
          <Chip
            label={t("points", { totalPoints })}
            size="small"
            className={quantityStyle}
            sx={{
              backgroundColor: inDrawer
                ? mymode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.08)"
                : "rgba(255, 255, 255, 0.15)",
              color: textColor,
              fontWeight: 600,
              fontSize: compact ? "0.65rem" : { xs: "0.7rem", sm: "0.75rem" },
              height: compact ? "20px" : { xs: "24px", sm: "28px" },
              "& .MuiChip-label": {
                px: compact ? 0.75 : { xs: 1, sm: 1.5 },
              },
              border: inDrawer
                ? mymode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(0, 0, 0, 0.12)"
                : "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: inDrawer
                  ? mymode === "dark"
                    ? "rgba(255, 255, 255, 0.25)"
                    : "rgba(0, 0, 0, 0.12)"
                  : "rgba(255, 255, 255, 0.25)",
                transform: "scale(1.05)",
              },
            }}
          />
        )}
      </Box>
    );
  };

  // Mobile drawer content
  const DrawerContent = () => (
    <Box
      sx={{
        width: 280,
        height: "100%",
        bgcolor: mymode === "dark" ? "grey.900" : "grey.50",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: mymode === "dark" ? "grey.800" : "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LogoComponent size={32} />
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ color: "white" }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Info in Drawer */}
      {token && (
        <Box
          sx={{ p: 2, bgcolor: mymode === "dark" ? "grey.800" : "grey.100" }}
        >
          <UserInfoComponent compact inDrawer />
        </Box>
      )}

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flex: 1, py: 1 }}>
        {headerElements.map(({ href, label }) => (
          <ListItem
            key={label}
            {...(href ? { component: Link, to: href } : {})}
            onClick={handleDrawerClose}
            sx={{
              py: 1.5,
              px: 2,
              color:
                mymode === "dark" ? "white !important" : "black !important",
              textDecoration: "none",
              borderLeft:
                location.pathname === href
                  ? "4px solid"
                  : "4px solid transparent",
              borderColor: "primary.main",
              backgroundColor:
                location.pathname === href
                  ? mymode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.04)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  mymode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontWeight: location.pathname === href ? 600 : 400,
                fontSize: "0.95rem",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Auth Items */}
      <List sx={{ py: 1 }}>
        {authElements.map(({ href, click, label }) => (
          <ListItem
            key={label}
            {...(href ? { component: Link, to: href } : {})}
            onClick={() => {
              if (click) click();
              handleDrawerClose();
            }}
            sx={{
              py: 1,
              px: 2,
              color:
                mymode === "dark" ? "white !important" : "black !important",
              textDecoration: "none",
              "&:hover": {
                backgroundColor:
                  mymode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: "0.9rem",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 1}
        sx={{
          backgroundColor: isScrolled
            ? mymode === "dark"
              ? "rgba(18, 18, 18, 0.95)"
              : "rgba(25, 118, 210, 0.95)"
            : mymode === "dark"
            ? "grey.900"
            : "primary.main",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: {
                xs: isVerySmallScreen && token && isStudent ? "80px" : "56px",
                sm: "64px",
              },
              flexDirection:
                isVerySmallScreen && token && isStudent ? "column" : "row",
              alignItems: "center",
              gap: isVerySmallScreen && token && isStudent ? 1 : 0,
              py: isVerySmallScreen && token && isStudent ? 1 : 0,
            }}
          >
            {/* Main toolbar content */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* Left section - Mobile menu + Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isMobile && (
                  <IconButton
                    size="small"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{
                      color: "inherit",
                      mr: 1,
                      p: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <MenuIcon fontSize={isSmallScreen ? "small" : "medium"} />
                  </IconButton>
                )}

                <LogoComponent
                  size={isVerySmallScreen ? 32 : isSmallScreen ? 36 : 40}
                />
              </Box>

              {/* Center section - Desktop Navigation */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {headerElements
                  .filter((page) => page.href !== undefined)
                  .map((page) => (
                    <Button
                      key={page.label}
                      component={Link}
                      to={page.href as string}
                      sx={{
                        color: "white",
                        fontWeight: page.href === location.pathname ? 600 : 400,
                        position: "relative",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          transform: "translateY(-1px)",
                        },
                        "&::after":
                          page.href === location.pathname
                            ? {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "60%",
                                height: "2px",
                                backgroundColor: "white",
                                borderRadius: "1px",
                              }
                            : {},
                      }}
                    >
                      {page.label}
                    </Button>
                  ))}
              </Box>

              {/* Right section - User info + Controls */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1 },
                }}
              >
                {/* User info - now always visible when token exists */}
                {token && (
                  <Box
                    sx={{
                      display: {
                        xs: isVerySmallScreen && isStudent ? "none" : "flex",
                        sm: "flex",
                      },
                    }}
                  >
                    <UserInfoComponent />
                  </Box>
                )}

                {/* User menu */}
                <Tooltip title={t("user-menu")}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    size={isSmallScreen ? "small" : "medium"}
                    sx={{
                      color: "inherit",
                      p: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <AccountCircleIcon
                      fontSize={isSmallScreen ? "small" : "medium"}
                    />
                  </IconButton>
                </Tooltip>

                {/* Mode and Language toggles */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& > *": {
                      transform: { xs: "scale(0.9)", sm: "scale(1)" },
                    },
                  }}
                >
                  <Mode />
                  <Languages />
                </Box>
              </Box>
            </Box>

            {/* Second row for very small screens with student info */}
            {isVerySmallScreen && token && isStudent && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <UserInfoComponent compact />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* User Menu */}
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          sx: {
            backgroundColor: mymode === "dark" ? "grey.800" : "white",
            minWidth: 180,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        {authElements.map(({ href, click, label }) => (
          <MenuItem
            key={label}
            onClick={() => {
              if (click) click();
              handleCloseUserMenu();
            }}
            {...(href ? { component: Link, to: href } : {})}
            sx={{
              color:
                mymode === "light" ? "black !important" : "white !important",
              py: 1.5,
              px: 2,
              fontSize: "0.9rem",
              "&:hover": {
                backgroundColor:
                  mymode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)",
              },
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor={direction.left}
        open={mobileDrawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
}

export default Header;
