export interface InitialStateMode {
  mymode: "dark" | "light";
}

export type QuestionData = {
  answer: string;
  hints: string[];
};
export interface InitialStateAuth {
  loadingAuth: boolean;
}
export interface InitialStateGame {
  questionData: QuestionData;
  loadingGetQuestions: boolean;
}
