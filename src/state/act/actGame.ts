import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import {
  UserDataGameGetQuestion,
  UserDataHintGameAnswerQuestion,
  UserDataEducationMakeQuestion,
  UserDataEntertainmentMakeQuestion,
  AnswerDifficultyT,
  EducationDifficultyT,
  EntertainmentDifficultyT,
} from "../../utils/types/DTO";
import {
  getHintsResponse,
  getOffsideHints,
  DifficultyResponse,
  AnswerDifficultyR,
} from "../../utils/dataResponse";

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
      const res = await axiosInstance.post(
        "/api/education/HintGame/ans",
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
export const getEducationDifficulty = createAsyncThunk(
  "gameSlice/getEducationDifficulty",
  async (userData: UserDataGameGetQuestion, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<DifficultyResponse>(
        "/api/education/DifficultyGame/question",
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
export const getEntertainmentDifficulty = createAsyncThunk(
  "gameSlice/getEntertainmentDifficulty",
  async (
    { entertainmentSection }: { entertainmentSection: Number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get<DifficultyResponse>(
        `/api/entertainment/DifficultyGame/question/${entertainmentSection}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // example
            // Add any other headers you need here
            "Content-Type": "application/json",
          },
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

export const answerDifficulty = createAsyncThunk(
  "gameSlice/answerDifficulty",
  async (answer: AnswerDifficultyT, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<AnswerDifficultyR>(
        "/api/education/DifficultyGame/Answer",
        answer,
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
export const makeEducationDifficulty = createAsyncThunk(
  "gameSlice/makeEducationDifficulty",
  async (educationDifficulty: EducationDifficultyT, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        "/api/education/DifficultyGame/makequestion",
        educationDifficulty,
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
export const makeEntertainmentDifficulty = createAsyncThunk(
  "gameSlice/makeEntertainmentDifficulty",
  async (entertainmentDifficulty: EntertainmentDifficultyT, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        "/api/entertainment/DifficultyGame/make",
        entertainmentDifficulty,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // example
            // Add any other headers you need here
            "Content-Type": "application/json",
          },
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
