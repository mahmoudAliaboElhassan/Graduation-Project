import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../utils/types/general";
import { useAppDispatch } from "./redux";
import { logOut } from "../state/slices/auth";

function UseHeaderElements() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
      click: () => dispatch(logOut()),
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
