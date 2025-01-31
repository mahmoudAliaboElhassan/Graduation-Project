import React from "react";
import { useTranslation } from "react-i18next"; // To use i18next translation
import { SubjectType } from "../utils/types/general";

function UseSubjects() {
  const { t } = useTranslation();

  const subjects: SubjectType[] = [
    { text: t("subject.arabic"), value: "Arabic" },
    { text: t("subject.mathematics"), value: "Mathematics" },
    { text: t("subject.english"), value: "English" },
    { text: t("subject.physics"), value: "Physics" },
    { text: t("subject.chemistry"), value: "Chemistry" },
    { text: t("subject.biology"), value: "Biology" },
    { text: t("subject.history"), value: "History" },
    { text: t("subject.geography"), value: "Geography" },
    { text: t("subject.science"), value: "Science" },
    { text: t("subject.physicalEducation"), value: "Physical Education" },
    { text: t("subject.art"), value: "Art" },
    { text: t("subject.music"), value: "Music" },
    { text: t("subject.socialStudies"), value: "Social Studies" },
    { text: t("subject.economics"), value: "Economics" },
  ];

  return { subjects };
}

export default UseSubjects;
