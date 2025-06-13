import { useTranslation } from "react-i18next";
import type { CtegoryGames } from "../utils/types/general";

function UseGamesCategories() {
  const { t } = useTranslation("translation");

  const categories: CtegoryGames[] = [
    {
      title: t("categories.entertainment.title"),
      description: t("categories.entertainment.description"),
      icon: "Theaters",
      color: "#EC4899", // Pink
      route: "/entertainment-sections",
    },
    {
      title: t("categories.education.title"),
      description: t("categories.education.description"),
      icon: "School",
      color: "#10B981", // Emerald
      route: "education",
    },
  ];

  return { categories };
}

export default UseGamesCategories;
