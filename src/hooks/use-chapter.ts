import React from "react";
import { useTranslation } from "react-i18next";
import { chapterType } from "../utils/types/general";

function UseChapter() {
  const { t } = useTranslation();
  const Chapters: chapterType[] = [
    {
      text: t("one"),
      value: "one",
    },
    {
      text: t("two"),
      value: "two",
    },
    {
      text: t("three"),
      value: "three",
    },
    {
      text: t("three"),
      value: "three",
    },

    {
      text: t("four"),
      value: "four",
    },
    {
      text: t("five"),
      value: "five",
    },
    {
      text: t("six"),
      value: "six",
    },
    {
      text: t("seven"),
      value: "seven",
    },
    {
      text: t("eight"),
      value: "eight",
    },
  ];
  return { Chapters };
}

export default UseChapter;
