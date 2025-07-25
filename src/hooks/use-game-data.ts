import { useTranslation } from "react-i18next";
import { GameData } from "../utils/types/general";

function UseGamesData() {
  const { t } = useTranslation();

  const gamesData: GameData[] = [
    {
      title: t("five-hints-title"),
      description: t("five-hints-description"),
      icon: "EmojiObjects", // Lightbulb icon for hints
      color: "#8B5CF6", // Purple
      category: "entertainment",
    },
    {
      title: t("offside-title"),
      description: t("offside-description"),
      icon: "SportsFootball", // Football icon for offside
      color: "#10B981", // Emerald
      category: "sports-games",
    },
    {
      title: t("question-journey-title"),
      description: t("question-journey-description"),
      icon: "Quiz", // Material icon for quiz game
      color: "#F59E0B", // Amber
      category: "educational",
    },
  ];

  return { gamesData };
}
export default UseGamesData;
