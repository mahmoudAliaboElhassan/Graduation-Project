import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import i18next from "i18next";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";

import UseLanguages from "../../hooks/use-langs";
import lamgImg from "../../assets/globe.png";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

function Languages() {
  const { Languages: langs } = UseLanguages();
  const currLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = langs.find((l) => l.code === currLanguageCode);
  useEffect(() => {
    document.documentElement.dir = currentLanguage?.dir || "ltr";
  });
  // will work all the time

  const changeLang = (code: string) => {
    handleCloseNavMenu();
    i18next.changeLanguage(code);
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const { t } = useTranslation();
  return (
    <>
      <Tooltip title={t(`languages`)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <LanguageIcon />
          <ArrowDropDownIcon />
        </IconButton>
      </Tooltip>
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
      >
        {langs.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLang(lang.code)}
            disabled={currLanguageCode === lang.code}
          >
            <Typography
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i
                className={`flag flag-${lang.country_code} larger-icon mx-2`}
              ></i>{" "}
              <span> {lang.name}</span>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default Languages;
