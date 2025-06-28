import { forLocalStorage } from "./initialState";
import gameSlice from "../../state/slices/game";

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
  correctanswer: forLocalStorage;
  hints: string;
}
export interface Grade {
  grade: number;
}
export interface UserDataEducationMakeQuestion {
  grade: number;
  question: string;
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
type answerQuestion = {
  answer: string;
  correctanswer: string;
  question: string;
};

export type AnswerDifficultyT = answerQuestion[];

export interface EducationDifficultyT {
  grade: number;
  chapter: string;
  userId: string;
  game: string;
  questions: {
    question: string;
    answer: string;
    summary: string;
    difficultyLevel: number;
  }[];
}
export interface EntertainmentDifficultyT {
  section: number;
  game: string;
  questions: {
    question: string;
    answer: string;
    summary: string;
    difficultyLevel: number;
  }[];
}
export interface ChapterData {
  grade: number;
  subject: string;
  chapterNumber: number;
  chapterName: string;
}
export interface GradeSubjects {
  grade: number;
  subjectNames: string[];
}
