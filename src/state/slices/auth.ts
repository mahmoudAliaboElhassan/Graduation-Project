import { createSlice } from "@reduxjs/toolkit"

import UseInitialStates from "../../hooks/use-initial-state"
import {
  signUp,
  logIn,
  getSubjects,
  getChapters,
  forgetPassword,
  resetPassword,
  addPoints,
  changePassword,
  getTopTen,
  getAllSubjects,
  getAllGrades,
  getTeacherGrades,
  getِAnsweredQuestions,
} from "../act/actAuth"
const { initialStateAuth } = UseInitialStates()

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token")
      state.token = ""
      state.totalPoints = "0"
      localStorage.removeItem("totalPoints")
      localStorage.removeItem("gameState")
      state.name = ""
      localStorage.removeItem("name")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loadingAuth = true
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loadingAuth = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingAuth = false
        state.error = action.payload as string
        console.log(action)
      })
      .addCase(addPoints.pending, (state) => {
        state.loadingAddPoints = true
      })
      .addCase(addPoints.fulfilled, (state, action) => {
        state.loadingAddPoints = false
        localStorage.setItem("totalPoints", String(action.payload.totalpoints))
        state.totalPoints = String(action.payload.totalpoints)
      })
      .addCase(addPoints.rejected, (state, action) => {
        state.loadingAddPoints = false
        state.error = action.payload as string
        // console.log(action);
      })
      .addCase(logIn.pending, (state) => {
        state.loadingAuth = true
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loadingAuth = false
        state.email = action.payload.email
        localStorage.setItem("email", action.payload.email)
        state.name = action.payload.name
        localStorage.setItem("name", action.payload.name)
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
        state.grade = action.payload.grade
        localStorage.setItem("grade", action.payload.grade)
        state.Uid = action.payload.id
        localStorage.setItem("id", action.payload.id)
        state.role = action.payload.role
        localStorage.setItem("role", action.payload.role)
        state.subjectTeaching = action.payload.subject
        localStorage.setItem("subjectTeaching", action.payload.subject)
        state.name = action.payload.name
        localStorage.setItem("name", action.payload.name)

        state.expirationToken = new Date(action.payload.expiration)
        localStorage.setItem(
          "expirationToken",
          String(new Date(action.payload.expiration))
        )

        localStorage.setItem("totalPoints", String(action.payload.points))
        state.totalPoints = String(action.payload.points)
      })
      .addCase(logIn.rejected, (state) => {
        state.loadingAuth = false
      })
      .addCase(getSubjects.pending, (state) => {
        state.loadingGetSubjects = true
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loadingGetSubjects = false
        state.subjects = action.payload.subjects
      })
      .addCase(getSubjects.rejected, (state) => {
        state.loadingGetSubjects = false
      })
      .addCase(getChapters.pending, (state) => {
        state.loadingGetSubjects = true
        // if (action.payload) {
        //   state.email = action.payload.email;
        // }
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.loadingGetSubjects = false
        state.chapters = action.payload.chapters
      })
      .addCase(getChapters.rejected, (state) => {
        state.loadingGetSubjects = false
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loadingForgetPassword = true
        // if (.payload) {
        //   state.email = .payload.email;
        // }
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loadingForgetPassword = false
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.loadingForgetPassword = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.loadingResetPassword = true
        // if (.payload) {
        //   state.email = .payload.email;
        // }
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loadingResetPassword = false
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loadingResetPassword = false
      })
      .addCase(changePassword.pending, (state) => {
        state.loadingChangePassword = true
        // if (.payload) {
        //   state.email = .payload.email;
        // }
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loadingChangePassword = false
      })
      .addCase(changePassword.rejected, (state) => {
        state.loadingChangePassword = false
      })
      .addCase(getTopTen.pending, (state) => {
        state.loadingGetTopTen = true
      })
      .addCase(getTopTen.fulfilled, (state, action) => {
        state.loadingGetTopTen = false
        state.topTen = action.payload
      })
      .addCase(getTopTen.rejected, (state) => {
        state.loadingGetTopTen = false
      })
      .addCase(getAllSubjects.pending, (state) => {
        state.loadingGetAllSubjects = true
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loadingGetAllSubjects = false
        state.allSubjects = action.payload
      })
      .addCase(getAllSubjects.rejected, (state) => {
        state.loadingGetAllSubjects = false
      })
      .addCase(getAllGrades.pending, (state) => {
        state.loadingGetAllGrades = true
      })
      .addCase(getAllGrades.fulfilled, (state, action) => {
        state.loadingGetAllGrades = false
        state.allGrades = action.payload
      })
      .addCase(getAllGrades.rejected, (state) => {
        state.loadingGetAllGrades = false
      })
      .addCase(getTeacherGrades.pending, (state) => {
        state.loadingGetTeacherGrades = true
      })
      .addCase(getTeacherGrades.fulfilled, (state, action) => {
        state.loadingGetTeacherGrades = false
        state.teacherGrades = action.payload
      })
      .addCase(getTeacherGrades.rejected, (state) => {
        state.loadingGetTeacherGrades = false
      })
      .addCase(getِAnsweredQuestions.pending, (state) => {
        state.loadingAnsweredQuestions = true
      })
      .addCase(getِAnsweredQuestions.fulfilled, (state, action) => {
        state.loadingAnsweredQuestions = false
        state.answeredQuestions = action.payload
      })
      .addCase(getِAnsweredQuestions.rejected, (state) => {
        state.loadingAnsweredQuestions = false
      })
  },
})

export default authSlice.reducer
export const { logOut } = authSlice.actions
export {
  signUp,
  logIn,
  getSubjects,
  getChapters,
  forgetPassword,
  addPoints,
  getAllSubjects,
}
