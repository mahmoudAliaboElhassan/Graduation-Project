export interface InitialValuesSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
  gradeUser: string;
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
  subjectQetQuestions: string;
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
export interface InitialValuesForgetPassword {
  email: string;
}
export interface InitialValuesResetPassword {
  password: string;
}
export interface InitialValuesAddGrade {
  grade: string;
}
export interface InitialValuesAddSubject {
  name: string;
  image: File | null;
}
export interface InitialValuesAddChapter {
  gradesSelect: number | null;
  subjectQetQuestions: string;
  chapterName: string;
  chapterNumber: number | null;
}
export interface InitialValuesAddSubjects {
  gradesSelect: number | null;
  subjects: string[];
}
