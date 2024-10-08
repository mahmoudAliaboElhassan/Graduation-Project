import React from "react";
import { useTranslation } from "react-i18next";

import { Auth } from "../utils/types";

function UseHeaderElements() {
  const { t } = useTranslation();
  const notUserAuth: Auth[] = [
    {
      href: "/signup",
      label: t("signup"),
    },
    {
      href: "/login",
      label: t("login"),
    },
  ];
  const userAuth: Auth[] = [
    {
      href: "/change-password",
      label: t("change-password"),
    },
    {
      label: t("logout"),
    },
  ];
  return { userAuth, notUserAuth };
}

export default UseHeaderElements;
