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
