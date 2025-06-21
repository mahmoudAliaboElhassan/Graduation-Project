import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  signUp,
  logIn,
  getSubjects,
  getChapters,
  forgetPassword,
  resetPassword,
  addPoints,
  changePassword,
} from "../act/actAuth";
const { initialStateAuth } = UseInitialStates();

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loadingAuth = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loadingAuth = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingAuth = false;
        state.error = action.payload as string;
        console.log(action);
      })
      .addCase(addPoints.pending, (state, action) => {
        state.loadingAddPoints = true;
      })
      .addCase(addPoints.fulfilled, (state, action) => {
        state.loadingAddPoints = false;
        state.totalPoints = action.payload.totalpoints;
      })
      .addCase(addPoints.rejected, (state, action) => {
        state.loadingAddPoints = false;
        state.error = action.payload as string;
        // console.log(action);
      })
      .addCase(logIn.pending, (state, action) => {
        state.loadingAuth = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.email = action.payload.email;
        localStorage.setItem("email", action.payload.email);
        state.name = action.payload.name;
        localStorage.setItem("name", action.payload.name);
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.grade = action.payload.grade;
        localStorage.setItem("grade", action.payload.grade);
        state.Uid = action.payload.id;
        localStorage.setItem("id", action.payload.id);
        state.role = action.payload.role;
        localStorage.setItem("role", action.payload.role);
        state.subjectTeaching = action.payload.subject;
        localStorage.setItem("subjectTeaching", action.payload.subject);
        state.name = action.payload.name;
        localStorage.setItem("name", action.payload.name);

        state.expirationToken = new Date(action.payload.expiration);
        localStorage.setItem(
          "expirationToken",
          String(new Date(action.payload.expiration))
        );
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loadingAuth = false;
      })
      .addCase(getSubjects.pending, (state, action) => {
        state.loadingGetSubjects = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loadingGetSubjects = false;
        state.subjects = action.payload.subjects;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loadingGetSubjects = false;
      })
      .addCase(getChapters.pending, (state, action) => {
        state.loadingGetSubjects = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.loadingGetSubjects = false;
        state.chapters = action.payload.chapters;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.loadingGetSubjects = false;
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.loadingForgetPassword = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loadingForgetPassword = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loadingForgetPassword = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loadingResetPassword = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loadingResetPassword = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loadingResetPassword = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loadingChangePassword = true;
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loadingChangePassword = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loadingChangePassword = false;
      });
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
export { signUp, logIn, getSubjects, getChapters, forgetPassword, addPoints };
