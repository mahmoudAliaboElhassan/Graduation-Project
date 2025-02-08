export interface InitialStateMode {
  mymode: "dark" | "light";
}
type forLocalStorage = string | null;

export type QuestionData = {
  correctAnswer: forLocalStorage;
  hints: string[];
};

export interface InitialStateAuth {
  loadingAuth: boolean;
  name: forLocalStorage;
  email: forLocalStorage;
  grade: forLocalStorage;
  token: forLocalStorage;
}
export interface InitialStateGame {
  questionData: QuestionData;
  loadingGetQuestions: boolean;
  loadingAnswerQuestion: boolean;
  rank:forLocalStorage;
}
