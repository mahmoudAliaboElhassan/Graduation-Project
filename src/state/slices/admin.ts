import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  getEducationQuestions,
  approveQuestion,
  rejectQuestion,
  getEntertainmentQuestions,
  addGrade,
  addSubject,
} from "../act/actAdmin";
import {
  EntertainmentQuestion,
  Question,
} from "../../utils/types/initialState";

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
      .addCase(getEducationQuestions.pending, (state) => {
        state.loadinGetQuestions = true;
        state.error = null;
      })
      .addCase(
        getEducationQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.loadinGetQuestions = false;
          state.questions = action.payload;
        }
      )
      .addCase(getEducationQuestions.rejected, (state, action) => {
        state.loadinGetQuestions = false;
        state.error = action.payload as string;
      })
      .addCase(getEntertainmentQuestions.pending, (state) => {
        state.loadinGetQuestions = true;
        state.error = null;
      })
      .addCase(
        getEntertainmentQuestions.fulfilled,
        (state, action: PayloadAction<EntertainmentQuestion[]>) => {
          state.loadinGetQuestions = false;
          state.EntertainmentQuestions = action.payload;
        }
      )
      .addCase(getEntertainmentQuestions.rejected, (state, action) => {
        state.loadinGetQuestions = false;
        state.error = action.payload as string;
      })

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
      })
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
      })
      .addCase(addGrade.pending, (state) => {
        state.error = null;
        state.loadingAddGrade = true;
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        state.loadingAddGrade = false;
      })
      .addCase(addGrade.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loadingAddGrade = false;
      })
      .addCase(addSubject.pending, (state) => {
        state.error = null;
        state.loadingAddSubject = true;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loadingAddSubject = false;
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loadingAddSubject = false;
      });
  },
});

export default adminSlice.reducer;
export {
  getEducationQuestions,
  approveQuestion,
  rejectQuestion,
  addGrade,
  addSubject,
};
