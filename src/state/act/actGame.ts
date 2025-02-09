import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import {
  UserDataHintGameGetQuestion,
  UserDataHintGameAnswerQuestion,
} from "../../utils/types/DTO";
import { getHintsResponse } from "../../utils/dataResponse";

export const getQuestion = createAsyncThunk(
  "gameSlice/getQuestion",
  async (userData: UserDataHintGameGetQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<getHintsResponse>(
        "/api/HintGame/question",
        userData
      );
      console.log("from slice res is", res);
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        console.log("400 Bad Request - Invalid input from slice");
      }
      return rejectWithValue(error.response?.data || error.message);
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
