export interface InitialStateMode {
  mymode: "dark" | "light";
}

type QuestionData = {
  answer: string;
  hints: string[];
};
export interface InitialStateAuth {
  loadingAuth: boolean;
}
export interface InitialStateGame {
  questionData: QuestionData | null;
}
