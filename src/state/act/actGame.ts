import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import {
  UserDataHintGameGetQuestion,
  UserDataHintGameAnswerQuestion,
} from "../../utils/types/DTO";
export const getQuestion = createAsyncThunk(
  "gameSlice/getQuestion",
  async (userData: UserDataHintGameGetQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/HintGame/question", userData);
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);

export const answerQuestion = createAsyncThunk(
  "gameSlice/answerQuestion",
  async (userData: UserDataHintGameAnswerQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/HintGame/ans", userData, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);
