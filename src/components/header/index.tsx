import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  return (
    <div>
      <div>Header</div>
      <div>{t("home")}</div>
      <button onClick={() => i18next.changeLanguage("ar")}>
        change lang ar
      </button>
      <button onClick={() => i18next.changeLanguage("en")}>
        change lang en
      </button>
    </div>
  );
}

export default Header;
