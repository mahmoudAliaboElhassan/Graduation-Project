import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getEducationQuestions = createAsyncThunk(
  "adminSlice/getEducationQuestions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get("/api/Admin/educational-questions");
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getEntertainmentQuestions = createAsyncThunk(
  "adminSlice/getEntertainmentQuestions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get("/api/Admin/entertainment-questions");
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const approveQuestion = createAsyncThunk(
  "adminSlice/approveQuestion",
  async ({ questionId }: { questionId: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/api/Admin/approve/${questionId}`);
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const rejectQuestion = createAsyncThunk(
  "adminSlice/rejectQuestion",
  async ({ questionId }: { questionId: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/api/Admin/reject/${questionId}`);
      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const addGrade = createAsyncThunk(
  "adminSlice/addGrade",
  async ({ grade }: { grade: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        `/api/Admin/add-grade`,
        { grade },
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
      return rejectWithValue(error.response.data);
    }
  }
);
export const addSubject = createAsyncThunk(
  "adminSlice/addSubject",
  async ({ name, image }: { name: string; image: File }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const res = await axiosInstance.post(`/api/Admin/add-subject`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Don't set Content-Type - let browser set it with boundary for multipart/form-data
        },
      });

      console.log("from slice res is");
      console.log(res);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("400 Bad Request from slice");
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
