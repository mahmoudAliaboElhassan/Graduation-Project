import React from "react";

import { useTranslation } from "react-i18next";
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  AccountBox,
} from "@mui/icons-material";

import { SocialMediaTypes } from "../utils/types/general";

function useSocialMedia() {
  const { t } = useTranslation();

  const socialLinks: SocialMediaTypes[] = [
    {
      icon: <Facebook fontSize="large" />,
      url: "https://www.facebook.com/MahmoudAliSoftwareDeveloper/",
      title: t("facebook"),
    },
    {
      icon: <AccountBox fontSize="large" />,
      url: "https://mahmoudaliaboelhassan.github.io/Portfolio-Website/",
      title: t("portfolio"),
    },
    {
      icon: <GitHub fontSize="large" />,
      url: "https://github.com/mahmoudAliaboElhassan",
      title: t("github"),
    },
    {
      icon: <LinkedIn fontSize="large" />,
      url: "https://www.linkedin.com/in/mahmoudfrontenddeveloper/",
      title: t("linkedin"),
    },
  ];
  return { socialLinks };
}

export default useSocialMedia;
