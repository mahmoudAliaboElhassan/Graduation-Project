import { forLocalStorage } from "./initialState";

export interface UserDataSignUp {
  name: string;
  password: string;
  email: string;
  type: number;
  grade: string;
  subject: string;
}
export interface UserDataLogin {
  email: string;
  password: string;
}
export interface UserDataGameGetQuestion {
  grade: forLocalStorage;
  subject: string;
  chapter: string;
  userID: string;
}
export interface UserDataHintGameAnswerQuestion {
  answer: string;
  hintsused: number;
  correctanswer: forLocalStorage;
}
export interface Grade {
  grade: number;
}
export interface UserDataEducationMakeQuestion {
  grade: number;
  userId: string;
  chapter: string;
  answer: string;
  summary: string;
  hints: string[] | string;
  game: string;
}
export interface UserDataEntertainmentMakeQuestion {
  question: string;
  answer: string;
  section: number;
  hints: string[] | string;
  summary: string;
  game: string;
}
