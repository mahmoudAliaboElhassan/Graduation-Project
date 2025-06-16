import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  getAllQuestions,
  approveQuestion,
  rejectQuestion,
} from "../act/actAdmin";
import { Question } from "../../utils/types/initialState";

const { initialStateAdmin } = UseInitialStates();

const adminSlice = createSlice({
  name: "admin",
  initialState: initialStateAdmin,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all questions
    builder
      .addCase(getAllQuestions.pending, (state) => {
        state.loadinGetQuestions = true;
        state.error = null;
      })
      .addCase(
        getAllQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.loadinGetQuestions = false;
          state.questions = action.payload;
        }
      )
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.loadinGetQuestions = false;
        state.error = action.payload as string;
      });

    // Approve question
    builder
      .addCase(approveQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(approveQuestion.fulfilled, (state, action) => {
        // Remove approved question from list or update its status
        state.questions = state.questions.filter(
          (q) => q.questionID !== action.meta.arg.questionId
        );
      })
      .addCase(approveQuestion.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Reject question
    builder
      .addCase(rejectQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(rejectQuestion.fulfilled, (state, action) => {
        // Remove rejected question from list or update its status
        state.questions = state.questions.filter(
          (q) => q.questionID !== action.meta.arg.questionId
        );
      })
      .addCase(rejectQuestion.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
export { getAllQuestions, approveQuestion, rejectQuestion };
