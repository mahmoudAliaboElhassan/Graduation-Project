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
        state.loadingGetQuestions = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.questionData = action.payload as {} as QuestionData;
        console.log("action.payload");
        console.log(action.payload);
        console.log("state.questionData");
        console.log(state.questionData);
        if (state.questionData.correctAnswer !== null) {
          localStorage.setItem(
            "correctAnswer",
            state.questionData.correctAnswer
          );
        }
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })
      .addCase(answerQuestion.pending, (state, action) => {
        state.loadingAnswerQuestion = true;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.loadingAnswerQuestion = false;
        state.rank = action.payload;
        localStorage.setItem("rank", action.payload);
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.loadingAnswerQuestion = false;
      });
  },
});

export default gameSlice.reducer;
export { getQuestion, answerQuestion };
