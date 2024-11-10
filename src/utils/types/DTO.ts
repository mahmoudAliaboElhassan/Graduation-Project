export interface UserDataSignUp {
  FirstName: string;
  LastName: string;
  password: string;
  email: string;
  type: string;
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
}
