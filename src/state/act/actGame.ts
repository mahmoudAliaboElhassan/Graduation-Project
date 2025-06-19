import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import {
  UserDataGameGetQuestion,
  UserDataHintGameAnswerQuestion,
  UserDataEducationMakeQuestion,
  UserDataEntertainmentMakeQuestion,
} from "../../utils/types/DTO";
import { getHintsResponse, getOffsideHints } from "../../utils/dataResponse";

export const getHintsQuestions = createAsyncThunk(
  "gameSlice/getHintsQuestions",
  async (userData: UserDataGameGetQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<getHintsResponse>(
        "/api/education/HintGame/question",
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

export const getHintsEntertainment = createAsyncThunk(
  "gameSlice/getHintsEntertainment",
  async (
    { entertainmentSection }: { entertainmentSection: Number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get<getOffsideHints>(
        `/api/Entertainment/HintGame/question/${entertainmentSection}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // example
            // Add any other headers you need here
            "Content-Type": "application/json",
          },
        }
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
        "/api/education/OffsideGame/question",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // example
            // Add any other headers you need here
            "Content-Type": "application/json",
          },
        }
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

export const getOffsideEntertainment = createAsyncThunk(
  "gameSlice/getOffsideEntertainment",
  async (
    { entertainmentSection }: { entertainmentSection: Number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get<getOffsideHints>(
        `/api/Entertainment/OffsideGame/question/${entertainmentSection}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // example
            // Add any other headers you need here
            "Content-Type": "application/json",
          },
        }
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
export const makeEducationQuestions = createAsyncThunk(
  "gameSlice/makeEducationQuestions",
  async (userData: UserDataEducationMakeQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        "/api/education/HintGame/makequestion",
        userData,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );
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
export const makeEntertainmentQuestions = createAsyncThunk(
  "gameSlice/makeEntertainmentQuestions",
  async (userData: UserDataEntertainmentMakeQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        "/api/entertainment/HintGame/makequestion",
        userData,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );
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
