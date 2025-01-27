export interface InitialValuesSignUp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
  grade: string;
  subject: string;
}
export interface InitialValuesLogin {
  email: string;
  password: string;
}
export interface InitialValuesChangePassword {
  currentPassword: string;
  newPassword: string;
}
export interface InitialValuesAnswerQuestion {
  answer: string;
}
