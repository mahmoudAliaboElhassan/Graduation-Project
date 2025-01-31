import { useTranslation } from "react-i18next";
import { GradesType } from "../utils/types/general";

function UseGrades() {
  const { t } = useTranslation();

  const grades: GradesType[] = [
    {
      group: t("primary"),
    },
    { text: t("grades.primary", { grade: 1 }), value: 1 },
    { text: t("grades.primary", { grade: 2 }), value: 2 },
    { text: t("grades.primary", { grade: 3 }), value: 3 },
    { text: t("grades.primary", { grade: 4 }), value: 4 },
    { text: t("grades.primary", { grade: 5 }), value: 5 },
    { text: t("grades.primary", { grade: 6 }), value: 6 },
    {
      group: t("preperatory"),
    },
    {
      text: t("grades.preparator", { grade: 1 }),
      value: 7,
    },
    {
      text: t("grades.preparator", { grade: 2 }),
      value: 8,
    },
    {
      text: t("grades.preparator", { grade: 3 }),
      value: 9,
    },
    {
      group: t("secondary"),
    },
    {
      text: t("grades.secondary", { grade: 1 }),
      value: 10,
      group: "secondary",
    },
    {
      text: t("grades.secondary", { grade: 2 }),
      value: 11,
      group: "secondary",
    },
    {
      text: t("grades.secondary", { grade: 3 }),
      value: 12,
      group: "secondary",
    },
  ];

  return { grades };
}

export default UseGrades;
