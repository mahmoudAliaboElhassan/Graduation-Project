import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import { signUp, logIn, getSubjects, getChapters } from "../act/actAuth";
const { initialStateAuth } = UseInitialStates();

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
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
      });
  },
});

export default authSlice.reducer;
export { signUp, logIn, getSubjects, getChapters };
