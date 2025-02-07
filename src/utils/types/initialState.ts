export interface InitialStateMode {
  mymode: "dark" | "light";
}

export type QuestionData = {
  correctAnswer: string | null;
  hints: string[];
};
export interface InitialStateAuth {
  loadingAuth: boolean;
}
export interface InitialStateGame {
  questionData: QuestionData;
  loadingGetQuestions: boolean;
  loadingAnswerQuestion: boolean;
}
