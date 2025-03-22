export interface LoginResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  expiration: string;
  grade: string;
  message: string;
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
export interface ResponseChapters {
  chapters: {chapter:string,value:number}[];
}
