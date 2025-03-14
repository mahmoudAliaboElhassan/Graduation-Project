export interface InitialValuesSignUp {
  name: string;
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
export interface InitialValeuesGetQuestion {
  chapter: string;
  subject: string;
}
export interface InitialValuesContacts {
  email: string;
  title: string;
  name: string;
  message: string;
}
