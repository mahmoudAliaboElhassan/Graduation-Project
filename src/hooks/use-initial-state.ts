import {
  InitialStateAuth,
  InitialStateMode,
  InitialStateGame,
  initialStateAdmin,
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
    Uid: localStorage.getItem("id"),
    error: "",
    subjects: [],
    chapters: [],
    role: localStorage.getItem("role"),
    subjectTeaching: localStorage.getItem("subjectTeaching"),
    loadingForgetPassword: false,
    loadingResetPassword: false,
    totalPoints: Number(localStorage.getItem("points")) || 0,
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

  const initialStateAdmin: initialStateAdmin = {
    questions: [],
    loadinGetQuestions: false,
    error: null,
  };
  return {
    initialStateMode,
    initialStateAuth,
    initialStateGame,
    initialStateAdmin,
  };
}

export default UseInitialStates;
