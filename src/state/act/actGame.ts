import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import {
  UserDataGameGetQuestion,
  UserDataHintGameAnswerQuestion,
} from "../../utils/types/DTO";
import { getHintsResponse, getOffsideHints } from "../../utils/dataResponse";

export const getHintsQuestions = createAsyncThunk(
  "gameSlice/getHintsQuestions",
  async (userData: UserDataGameGetQuestion, thunkAPI) => {
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
export const getOffSideQuestions = createAsyncThunk(
  "gameSlice/getOffSideQuestions",
  async (userData: UserDataGameGetQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<getOffsideHints>(
        "/api/OffsideGame/question",
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
