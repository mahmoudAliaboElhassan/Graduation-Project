import React from "react";
import { useTranslation } from "react-i18next";
import { GameData } from "../utils/types/general";

function UseGamesData() {
  const { t } = useTranslation();
  const gamesData: GameData[] = [
    {
      title: t("five-hints-title"),
      description: t("five-hints-description"),
    },
    {
      title: t("offside-title"),
      description: t("offside-description"),
    },
  ];
  return { gamesData };
}

export default UseGamesData;
