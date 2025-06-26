import { string } from "yup";
import { TopTenR } from "../dataResponse";

export interface InitialStateMode {
  mymode: "dark" | "light";
}
export type forLocalStorage = string | null;

export type QuestionData = {
  correctAnswer: forLocalStorage;
  hints: string[];
};

export interface InitialStateAuth {
  loadingAuth: boolean;
  loadingGetSubjects: boolean;
  loadingChangePassword: boolean;
  loadingAddPoints: boolean;
  name: forLocalStorage;
  email: forLocalStorage;
  grade: forLocalStorage;
  token: forLocalStorage;
  Uid: forLocalStorage;
  error: string;
  subjects: string[];
  chapters: { name: string; number: number }[];
  role: forLocalStorage;
  subjectTeaching: forLocalStorage;
  expirationToken: Date | null;
  totalPoints: number;
  loadingForgetPassword: boolean;
  loadingResetPassword: boolean;
  loadingGetTopTen: boolean;
  topTen: TopTenR;
  allSubjects: string[];
  loadingGetAllSubjects: boolean;
  loadingGetAllGrades: boolean;
  loadingGetTeacherGrades: boolean;
  allGrades: { gradeId: number; gradeName: string }[];
  teacherGrades: { gradeId: number; gradeName: string }[];
}

type DifficultyDataQuestion = {
  question: string;
  correctAnswer: string;
  score: number;
};
export interface InitialStateGame {
  questionData: QuestionData;
  loadingGetQuestions: boolean;
  loadingAnswerQuestion: boolean;
  offsideInformation: string[];
  offsideCorrectAnswer: number[];
  rank: forLocalStorage;
  correct: boolean;
  difficultyData: DifficultyDataQuestion[];
  question: string;
  summary: string;
}
export type Question = {
  questionID: number;
  chapterName: string;
  gradeName: string;
  subjectName: string;
  answer: string;
  summary: string;
  game: string;
  hints: string[];
};
export type EntertainmentQuestion = {
  questionID: number;
  question: string;
  answer: string;
  section: number;
  summary: string;
  game: string;
  hints: string[];
};

export interface initialStateAdmin {
  questions: Question[];
  loadinGetQuestions: boolean;
  loadingAddGrade: boolean;
  loadingAddSubject: boolean;
  loadingAddChapter: boolean;
  loadinAddGradeSubjects: boolean;
  error: string | null;
  EntertainmentQuestions: EntertainmentQuestion[];
}
