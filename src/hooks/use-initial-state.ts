import {
  InitialStateAuth,
  InitialStateMode,
  InitialStateGame,
} from "../utils/types/initialState";

function UseInitialStates() {
  const initialStateMode: InitialStateMode = {
    // Check if the localStorage value is either "dark" or "light", else default to "dark"
    mymode: (localStorage.getItem("mymode") as "dark" | "light") || "dark",
  };
  const initialStateAuth: InitialStateAuth = {
    loadingAuth: false,
  };
  const initialStateGame: InitialStateGame = {
    questionData: {
      answer: "",
      hints: [],
    },
    loadingGetQuestions: false,
    loadingAnswerQuestion: false,
  };

  return { initialStateMode, initialStateAuth, initialStateGame };
}

export default UseInitialStates;
