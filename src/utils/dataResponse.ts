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
}
export interface getHintsResponse {
  correctAnswer: string;
  hints: string[];
}
export interface getOffsideHints {
  correctAnswer: number[];
  information: string[];
}
export interface ResponseSubject {
  subjects: string[];
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
