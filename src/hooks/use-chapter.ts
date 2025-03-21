import React from "react";
import { useTranslation } from "react-i18next";
import { chapterType } from "../utils/types/general";

function UseChapter() {
  const { t } = useTranslation();
  const Chapters: chapterType[] = [
    {
      text: t("one"),
      value: "1",
    },
    {
      text: t("two"),
      value: "2",
    },
    {
      text: t("three"),
      value: "3",
    },
    {
      text: t("three"),
      value: "4",
    },

    {
      text: t("four"),
      value: "5",
    },
    {
      text: t("five"),
      value: "6",
    },
    {
      text: t("six"),
      value: "7",
    },
    {
      text: t("seven"),
      value: "8",
    },
    {
      text: t("eight"),
      value: "9",
    },
  ];
  return { Chapters };
}

export default UseChapter;
