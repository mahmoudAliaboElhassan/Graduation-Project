import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import { UserDataLogin, UserDataSignUp } from "../../utils/types/DTO";
export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData: UserDataSignUp, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/Accounts/register", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
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
export const logIn = createAsyncThunk(
  "authSlice/logIn",
  async (userData: UserDataLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/Accounts/login", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
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
