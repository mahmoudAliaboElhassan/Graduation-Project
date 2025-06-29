export interface LoginResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  expiration: string;
  grade: string;
  message: string;
  role: string;
  subject: string;
  points: number;
}
export interface getHintsResponse {
  correctAnswer: string;
  hints: string[];
  question: string;
  summary: string;
}
export interface getOffsideHints {
  correctAnswer: number[];
  information: string[];
  question: string;
  summary: string;
}
export interface ResponseSubject {
  subjects: { subjectName: string; subjectImage: string }[];
}
export interface ResponsePoints {
  totalpoints: number;
}
export interface ResponseChapters {
  chapters: { name: string; number: number }[];
}

type DifficultyQuestion = {
  question: string;
  correctAnswer: string;
  score: number;
};
export type DifficultyResponse = DifficultyQuestion[];

export type AnswerDifficultyR = boolean[];

export interface PlayerScore {
  name: string;
  totalPoints: number;
}

export interface TopTenR {
  me: number;
  data: PlayerScore[];
}
export type Subjects = string[];

export type Grades = { gradeId: number; gradeName: string }[];

export interface AnswerdQuestion {
  questionText: string;
  correctAnswer: string;
  subject: string;
  chapter: string;
  hints: string[];
  game: string;
}
export type AnsweredQuestions = AnswerdQuestion[];
