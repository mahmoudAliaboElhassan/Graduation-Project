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
export interface InitialValuesOffsideGame {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
}
