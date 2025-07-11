import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  getHintsQuestions,
  answerQuestion,
  getOffSideQuestions,
  getHintsEntertainment,
  getOffsideEntertainment,
  getEducationDifficulty,
  getEntertainmentDifficulty,
  answerDifficulty,
} from "../act/actGame";
import { QuestionData } from "../../utils/types/initialState";
const { initialStateGame } = UseInitialStates();

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: initialStateGame,
  reducers: {
    clearHintsData: (state) => {
      state.questionData = {} as QuestionData;
      state.question = "";
      state.summary = "";
    },
    clearDifficultyData: (state) => {
      state.difficultyData = [];
      state.question = "";
      state.summary = "";
    },
    clearOffsieData: (state) => {
      state.offsideInformation = [];
      state.offsideCorrectAnswer = [];
      state.question = "";
      state.summary = "";
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
        state.errorGetQuestions = "";
      })
      .addCase(getHintsQuestions.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.errorGetQuestions = "";

        state.summary = action.payload.summary;
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
        state.errorGetQuestions =
          (typeof action.payload === "string"
            ? action.payload
            : action.error?.message) || "An unknown error occurred";
      })
      .addCase(getHintsEntertainment.pending, (state, action) => {
        state.loadingGetQuestions = true;
        state.errorGetQuestions = "";
      })
      .addCase(getHintsEntertainment.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.errorGetQuestions = "";

        state.summary = action.payload.summary;
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
        state.errorGetQuestions =
          (typeof action.payload === "string"
            ? action.payload
            : action.error?.message) || "An unknown error occurred";
      })

      .addCase(getOffSideQuestions.pending, (state, action) => {
        state.loadingGetQuestions = true;
        state.errorGetQuestions = "";
      })
      .addCase(getOffSideQuestions.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.summary = action.payload.summary;
        state.loadingGetQuestions = false;
        state.offsideInformation = action.payload.information;
        state.offsideCorrectAnswer = action.payload.correctAnswer;
        state.errorGetQuestions = "";
      })
      .addCase(getOffSideQuestions.rejected, (state, action) => {
        state.loadingGetQuestions = false;
        state.errorGetQuestions =
          (typeof action.payload === "string"
            ? action.payload
            : action.error?.message) || "An unknown error occurred";
      })
      .addCase(getOffsideEntertainment.pending, (state, action) => {
        state.loadingGetQuestions = true;
        state.errorGetQuestions = "";
      })
      .addCase(getOffsideEntertainment.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.summary = action.payload.summary;
        state.loadingGetQuestions = false;
        state.offsideInformation = action.payload.information;
        state.offsideCorrectAnswer = action.payload.correctAnswer;
        state.errorGetQuestions = "";
      })
      .addCase(getOffsideEntertainment.rejected, (state, action) => {
        state.loadingGetQuestions = false;
        state.errorGetQuestions =
          (typeof action.payload === "string"
            ? action.payload
            : action.error?.message) || "An unknown error occurred";
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
      })
      .addCase(getEducationDifficulty.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getEducationDifficulty.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.difficultyData = action.payload;
      })
      .addCase(getEducationDifficulty.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })
      .addCase(getEntertainmentDifficulty.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getEntertainmentDifficulty.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.difficultyData = action.payload;
      })
      .addCase(getEntertainmentDifficulty.rejected, (state, action) => {
        state.loadingGetQuestions = false;
      })
      .addCase(answerDifficulty.pending, (state, action) => {
        state.loadingAnswerQuestion = true;
      })
      .addCase(answerDifficulty.fulfilled, (state, action) => {
        state.loadingAnswerQuestion = false;
      })
      .addCase(answerDifficulty.rejected, (state, action) => {
        state.loadingAnswerQuestion = false;
      });
  },
});

export const { clearHintsData, clearOffsieData, clearDifficultyData } =
  gameSlice.actions;
export default gameSlice.reducer;
export {
  getHintsQuestions,
  getHintsEntertainment,
  getOffSideQuestions,
  answerQuestion,
  getOffsideEntertainment,
  getEducationDifficulty,
};
