import React from "react";
import { useTranslation } from "react-i18next";

import { Header } from "../utils/types";

function UseHeaderElements() {
  const { t } = useTranslation();
  const notUserAuth: Header[] = [
    {
      href: "/signup",
      label: t("signup"),
    },
    {
      href: "/login",
      label: t("login"),
    },
  ];
  const userAuth: Header[] = [
    {
      href: "/change-password",
      label: t("change-password"),
    },
    {
      label: t("logout"),
    },
  ];

  const headerElements: Header[] = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("about"),
      href: "/about",
    },
    {
      label: t("contact"),
      href: "/contacts",
    },
  ];
  return { userAuth, notUserAuth, headerElements };
}

export default UseHeaderElements;
