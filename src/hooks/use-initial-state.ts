import {
  InitialStateAuth,
  InitialStateMode,
  InitialStateGame,
} from "../utils/types/initialState";

function UseInitialStates() {
  const initialStateMode: InitialStateMode = {
    mymode: (localStorage.getItem("mymode") as "dark" | "light") || "dark",
  };
  const initialStateAuth: InitialStateAuth = {
    loadingAuth: false,
    loadingGetSubjects: false,
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    grade: localStorage.getItem("grade"),
    token: localStorage.getItem("token"),
    error: "",
    subjects: [],
    chapters: [],
  };
  const initialStateGame: InitialStateGame = {
    questionData: {
      correctAnswer: localStorage.getItem("correctAnswer") || null,
      hints: [],
    },
    loadingGetQuestions: false,
    loadingAnswerQuestion: false,
    rank: localStorage.getItem("rank") || null,
    offsideInformation: [],
    offsideCorrectAnswer: [],
  };

  return { initialStateMode, initialStateAuth, initialStateGame };
}

export default UseInitialStates;
