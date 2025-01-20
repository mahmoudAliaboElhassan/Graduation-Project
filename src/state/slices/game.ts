import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import { getQuestion, answerQuestion } from "../act/actGame";
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
        state.questionData = action.payload as any;
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
