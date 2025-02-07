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
export interface UserDataHintGameGetQuestion {
  grade: string;
  subject: string;
  chapter: string;
}
export interface UserDataHintGameAnswerQuestion {
  answer: string;
  hintsused: number;
  correctanswer: string | null;
}
