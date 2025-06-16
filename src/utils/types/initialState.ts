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
  loadingForgetPassword: boolean;
  loadingResetPassword: boolean;
}
export interface InitialStateGame {
  questionData: QuestionData;
  loadingGetQuestions: boolean;
  loadingAnswerQuestion: boolean;
  offsideInformation: string[];
  offsideCorrectAnswer: number[];
  rank: forLocalStorage;
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

export interface initialStateAdmin {
  questions: Question[];
  loadinGetQuestions: boolean;
  error: string | null;
}
