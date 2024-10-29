import React from "react";
import { useTranslation } from "react-i18next";
import { RolesType } from "../utils/types/general";

function UseRoles() {
  const { t } = useTranslation();
  const Roles: RolesType[] = [
    {
      text: t("student"),
      value: 0,
    },
    {
      text: t("teacher"),
      value: 1,
    },
    {
      text: t("other"),
      value: 2,
    },
  ];
  return { Roles };
}

export default UseRoles;
