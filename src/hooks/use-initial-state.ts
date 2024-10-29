import {
  InitialStateAuth,
  InitialStateMode,
} from "../utils/types/initialState";

function UseInitialStates() {
  const initialStateMode: InitialStateMode = {
    // Check if the localStorage value is either "dark" or "light", else default to "dark"
    mymode: (localStorage.getItem("mymode") as "dark" | "light") || "dark",
  };
  const initialStateAuth: InitialStateAuth = {
    loadingAuth: false,
  };

  return { initialStateMode, initialStateAuth };
}

export default UseInitialStates;
