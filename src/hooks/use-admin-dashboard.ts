import { useTranslation } from "react-i18next";
import { MenuItem } from "../utils/types/general";

function UseAdminDashboard() {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      text: t("dashboard"),
      icon: "DashboardIcon",
      path: "",
    },
    { id: 2, text: t("addSubject"), icon: "SchoolIcon", path: "add-subject" },
    { id: 3, text: t("addGrade"), icon: "GradeIcon", path: "add-grade" },
    { id: 4, text: t("addChapter"), icon: "ChapterIcon", path: "add-chapter" },
    {
      id: 4,
      text: t("addGradeSubjects"),
      icon: "ChapterIcon",
      path: "add-grade-subjects",
    },
    {
      id: 5,
      text: t("educationalQuestions"),
      icon: "QuizIcon",
      path: "educational-questions",
    },
    {
      id: 6,
      text: t("entertainmentQuestions"),
      icon: "EntertainmentIcon",
      path: "entertainment-questions",
    },
  ];

  return { menuItems };
}

export default UseAdminDashboard;
