import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UseHeaderElements from "../../hooks/use-header-elements";
import { useAppSelector } from "../../hooks/redux";
import logoImg from "../../assets/logo.jpg";
import Languages from "../lngs";
import Mode from "../mode";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { t } = useTranslation();
  const { userAuth, notUserAuth, headerElements } = UseHeaderElements();
  const { token } = useAppSelector((state) => state.auth);
  const authElements = token ? userAuth : notUserAuth;
  const { mymode } = useAppSelector((state) => state.mode);
  const location = useLocation();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              // flexGrow: 1,
            }}
            component={Link}
            to="/"
          >
            <img
              src={logoImg}
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            />
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              width: "fit-content",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {headerElements.map(({ href, label }) => (
                <MenuItem
                  key={label}
                  onClick={handleCloseNavMenu}
                  component={Link as any}
                  to={href}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: mymode === "light" ? "black" : "white",
                    }}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            sx={{
              display: { xs: "flex", md: "none" },
              // mr: 1,
              flexGrow: 1,
              justifyContent: "center",
              width: "fit-content",
              margin: "auto",
            }}
            component={Link}
            to="/"
          >
            {" "}
            <img
              src={logoImg}
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            />
          </Typography>
          {/* <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {headerElements.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight:
                    page.href == location.pathname ? "bold" : "normal",
                }}
                // style={{
                // }}
                component={Link as any}
                to={page.href}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t("user-menu")}>
              <IconButton color="inherit" onClick={handleOpenUserMenu}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authElements.map(({ href, click, label }) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    if (click) click();
                    handleCloseUserMenu();
                  }}
                  {...(href ? { component: Link as any, to: href } : {})}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: mymode === "light" ? "black" : "white",
                    }}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Mode />
            <Languages />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
