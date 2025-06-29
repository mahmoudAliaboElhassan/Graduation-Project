import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../utils/types/general";
import { useAppDispatch, useAppSelector } from "./redux";
import { logOut } from "../state/slices/auth";

function UseHeaderElements() {
  const { t } = useTranslation();
  const { token, role } = useAppSelector((state) => state.auth);
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

  const header: Header[] = [
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
    {
      label: t("top10.title"),
      href: "/top-10",
    },
    {
      label: t("answered-questions"),
      href: "/answered-questions",
    },
  ];

  const headerElements =
    token && role === "Student" ? header : header.slice(0, -2);

  return { userAuth, notUserAuth, headerElements };
}

export default UseHeaderElements;
