import { useTranslation } from "react-i18next";
import type { CtegoryGames } from "../utils/types/general";

function UseQuestionCategories() {
  const { t } = useTranslation("translation");

  const categoryQuestionMaking: CtegoryGames[] = [
    {
      title: t("questionCategories.entertainment.title"),
      description: t("questionCategories.entertainment.description"),
      icon: "Theaters",
      color: "#06B6D4", // Cyan
      route: "/entertainment-sections",
    },
    {
      title: t("questionCategories.academic.title"),
      description: t("questionCategories.academic.description"),
      icon: "School",
      color: "#3B82F6", // Blue
      route: "education",
    },
  ];

  return { categoryQuestionMaking };
}

export default UseQuestionCategories;
