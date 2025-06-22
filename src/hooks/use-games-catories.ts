import { useTranslation } from "react-i18next";
import type { CtegoryGames } from "../utils/types/general";

function UseGamesCategories() {
  const { t } = useTranslation("translation");

  const categories: CtegoryGames[] = [
    {
      title: t("categories.entertainment.title"),
      description: t("categories.entertainment.description"),
      icon: "Theaters",
      color: "#06B6D4", // Cyan
      route: "/entertainment-sections",
      state: "play",
    },
    {
      title: t("categories.education.title"),
      description: t("categories.education.description"),
      icon: "School",
      color: "#3B82F6", // Blue
      route: "education",
    },
  ];

  return { categories };
}

export default UseGamesCategories;
