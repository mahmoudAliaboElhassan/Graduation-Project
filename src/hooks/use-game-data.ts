import React from "react";
import { useTranslation } from "react-i18next";
import { GameData } from "../utils/types/general";
import Hint from "../assets/Hint.png";
import Offside from "../assets/Offside.jpg";
function UseGamesData() {
  const { t } = useTranslation();
  const gamesData: GameData[] = [
    {
      title: t("five-hints-title"),
      description: t("five-hints-description"),
      image: Hint,
    },
    {
      title: t("offside-title"),
      description: t("offside-description"),
      image: Offside,
    },
  ];
  return { gamesData };
}

export default UseGamesData;
