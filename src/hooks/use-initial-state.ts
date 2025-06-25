import {
  InitialStateAuth,
  InitialStateMode,
  InitialStateGame,
  initialStateAdmin,
  forLocalStorage,
} from "../utils/types/initialState";

function UseInitialStates() {
  const initialStateMode: InitialStateMode = {
    mymode: (localStorage.getItem("mymode") as "dark" | "light") || "dark",
  };
  const getExpirationToken = (): Date | null => {
    const storedExpiration = localStorage.getItem("expirationToken");
    if (!storedExpiration) return null;

    const parsedDate = new Date(storedExpiration);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const initialStateAuth: InitialStateAuth = {
    loadingAuth: false,
    loadingGetSubjects: false,
    loadingChangePassword: false,
    loadingAddPoints: false,
    name: localStorage.getItem("name") as forLocalStorage,
    email: localStorage.getItem("email") as forLocalStorage,
    grade: localStorage.getItem("grade") as forLocalStorage,
    token: localStorage.getItem("token") as forLocalStorage,
    Uid: localStorage.getItem("id") as forLocalStorage,
    error: "",
    subjects: [],
    chapters: [],
    role: localStorage.getItem("role") as forLocalStorage,
    subjectTeaching: localStorage.getItem("subjectTeaching") as forLocalStorage,
    expirationToken: getExpirationToken(), // ✅ safely handled here
    totalPoints: 0,
    loadingForgetPassword: false,
    loadingResetPassword: false,
    loadingGetTopTen: false,
    topTen: {
      me: 0,
      data: [],
    },

    allSubjects: [],
    loadingGetAllSubjects: false,
    loadingGetAllGrades: false,
    allGrades: [{ gradeId: 0, gradeName: "" }],
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
    correct: false,
    difficultyData: [],
    question: "",
    summary: "",
  };

  const initialStateAdmin: initialStateAdmin = {
    questions: [],
    loadinGetQuestions: false,
    error: null,
    EntertainmentQuestions: [],
  };
  return {
    initialStateMode,
    initialStateAuth,
    initialStateGame,
    initialStateAdmin,
  };
}

export default UseInitialStates;
