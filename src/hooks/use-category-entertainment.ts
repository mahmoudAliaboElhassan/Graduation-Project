import { useTranslation } from "react-i18next";
import { CategoryEntertainmentGame } from "../utils/types/general";

function UseCategoryEntertainment() {
  const { t } = useTranslation();

  const categoriesEntertainment: CategoryEntertainmentGame[] = [
    {
      value: "0",
      text: t("entertainment-categories.musicSongs.text"),
      description: t("entertainment-categories.musicSongs.description"),
      icon: "MusicNote",
      color: "#8B5CF6", // Purple
      route: "/music-songs",
    },
    {
      value: "1",
      text: t("entertainment-categories.moviesTv.text"),
      description: t("entertainment-categories.moviesTv.description"),
      icon: "Movie",
      color: "#EC4899", // Pink
      route: "/movies-tv",
    },
    {
      value: "2",
      text: t("entertainment-categories.artPaintings.text"),
      description: t("entertainment-categories.artPaintings.description"),
      icon: "Palette",
      color: "#F59E0B", // Amber
      route: "/art-paintings",
    },
    {
      value: "3",
      text: t("entertainment-categories.generalKnowledge.text"),
      description: t("entertainment-categories.generalKnowledge.description"),
      icon: "MenuBook",
      color: "#10B981", // Emerald
      route: "/general-knowledge",
    },
    {
      value: "4",
      text: t("entertainment-categories.sportsGames.text"),
      description: t("entertainment-categories.sportsGames.description"),
      icon: "EmojiEvents",
      color: "#3B82F6", // Blue
      route: "/sports-games",
    },
  ];

  return { categoriesEntertainment };
}

export default UseCategoryEntertainment;
