import { useTranslation } from "react-i18next";
import { CategoryEntertainmentGame } from "../utils/types/general";

function UseCategoryEntertainment() {
  const { t } = useTranslation();

  const categoriesEntertainment: CategoryEntertainmentGame[] = [
    {
      id: "0",
      title: t("entertainment-categories.musicSongs.title"),
      description: t("entertainment-categories.musicSongs.description"),
      icon: "MusicNote",
      color: "#8B5CF6", // Purple
      route: "/music-songs",
    },
    {
      id: "1",
      title: t("entertainment-categories.moviesTv.title"),
      description: t("entertainment-categories.moviesTv.description"),
      icon: "Movie",
      color: "#EC4899", // Pink
      route: "/movies-tv",
    },
    {
      id: "2",
      title: t("entertainment-categories.artPaintings.title"),
      description: t("entertainment-categories.artPaintings.description"),
      icon: "Palette",
      color: "#F59E0B", // Amber
      route: "/art-paintings",
    },
    {
      id: "3",
      title: t("entertainment-categories.generalKnowledge.title"),
      description: t("entertainment-categories.generalKnowledge.description"),
      icon: "MenuBook",
      color: "#10B981", // Emerald
      route: "/general-knowledge",
    },
    {
      id: "4",
      title: t("entertainment-categories.sportsGames.title"),
      description: t("entertainment-categories.sportsGames.description"),
      icon: "EmojiEvents",
      color: "#3B82F6", // Blue
      route: "/sports-games",
    },
  ];

  return { categoriesEntertainment };
}

export default UseCategoryEntertainment;
