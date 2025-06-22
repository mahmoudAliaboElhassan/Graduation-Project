import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  getHintsQuestions,
  answerQuestion,
  getOffSideQuestions,
  getHintsEntertainment,
  getOffsideEntertainment,
} from "../act/actGame";
import { QuestionData } from "../../utils/types/initialState";
const { initialStateGame } = UseInitialStates();

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: initialStateGame,
  reducers: {
    clearHintsData: (state) => {
      state.questionData = {} as QuestionData;
    },
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
      .addCase(getHintsQuestions.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getHintsQuestions.fulfilled, (state, action) => {
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
      .addCase(getHintsQuestions.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })
      .addCase(getHintsEntertainment.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getHintsEntertainment.fulfilled, (state, action) => {
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
      .addCase(getHintsEntertainment.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })

      .addCase(getOffSideQuestions.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getOffSideQuestions.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.offsideInformation = action.payload.information;
        state.offsideCorrectAnswer = action.payload.correctAnswer;
      })
      .addCase(getOffSideQuestions.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })
      .addCase(getOffsideEntertainment.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getOffsideEntertainment.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.offsideInformation = action.payload.information;
        state.offsideCorrectAnswer = action.payload.correctAnswer;
      })
      .addCase(getOffsideEntertainment.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })

      .addCase(answerQuestion.pending, (state, action) => {
        state.loadingAnswerQuestion = true;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.loadingAnswerQuestion = false;
        state.correct = action.payload;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.loadingAnswerQuestion = false;
      });
  },
});

export const { clearHintsData } = gameSlice.actions;
export default gameSlice.reducer;
export {
  getHintsQuestions,
  getHintsEntertainment,
  getOffSideQuestions,
  answerQuestion,
  getOffsideEntertainment,
};
