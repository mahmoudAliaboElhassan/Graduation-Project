import { useTranslation } from "react-i18next";
import type { CtegoryGames } from "../utils/types/general";
import { useAppSelector } from "./redux";

function UseQuestionCategories() {
  const { t } = useTranslation("translation");
  const { role } = useAppSelector((state) => state.auth);
  const categoryQuestionMaking: CtegoryGames[] = [
    {
      title: t("questionCategories.entertainment.title"),
      description: t("questionCategories.entertainment.description"),
      icon: "Theaters",
      color: "#06B6D4", // Cyan
      route: role !== "Teacher" ? "/entertainment-sections" : "entertainment",
      state: "make",
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
