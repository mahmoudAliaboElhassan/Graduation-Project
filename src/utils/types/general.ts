import React from "react";

export interface Header {
  href?: string;
  click?: () => void;
  label: string;
}
export interface DirectionType {
  direction: "ltr" | "rtl";
  left: string;
  right: string;
  marginLeft: string;
  marginRight: string;
  paddingLeft: string;
  paddingRight: string;
  borderTopRightRadius: string;
  borderRight: string;
}
export interface lang {
  code: string;
  name: string;
  country_code: string;
  dir?: string;
}
export interface RolesType {
  text: string;
  value: number | string;
}
export interface GradesType {
  text?: string;
  group?: string;
  value?: number;
}
export interface SubjectType {
  text: string;
  value: string;
}
export interface chapterType {
  text: string;
  value: string;
}
export interface SocialMediaTypes {
  url: string;
  icon: React.ReactNode;
  title: string;
}
export interface GameData {
  title: string;
  description: string;
  icon: string;
  color: string;
  category?: string;
}
export interface CtegoryGames {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  state?: string;
}
export interface CategoryEntertainmentGame {
  value: string;
  text: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}
export interface MenuItem {
  text: string;
  icon: string;
  path: string;
  badge?: string;
  id: number;
}
