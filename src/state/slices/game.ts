import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import { getQuestion, answerQuestion } from "../act/actGame";
import { QuestionData } from "../../utils/types/initialState";
const { initialStateGame } = UseInitialStates();

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: initialStateGame,
  reducers: {
    // handlelogOutState: (state) => {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("type");
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("expired");
    //   localStorage.removeItem("userId");
    //   localStorage.removeItem("countOfCartItem");
    //   state.token = "";
    //   state.expireToken = "";
    //   state.role = "";
    //   state.Uid = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.pending, (state, action) => {
        // state.loadingAuth = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        // state.loadingAuth = false;
        state.questionData = action.payload as {} as QuestionData;
        // Conversion of type 'AxiosResponse<any, any>' to type 'QuestionData' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional,
        // convert the expression to 'unknown' or {} first.
        console.log("action.payload");
        console.log(action.payload);
        console.log(state.questionData);
      })
      .addCase(getQuestion.rejected, (state, action) => {
        // state.loadingAuth = false;
      })
      .addCase(answerQuestion.pending, (state, action) => {
        // state.loadingAuth = true;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        // state.loadingAuth = false;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        // state.loadingAuth = false;
      });
  },
});

export default gameSlice.reducer;
export { getQuestion, answerQuestion };
