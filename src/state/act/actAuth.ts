import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserData } from "../../utils/types";
import axiosInstance from "../../utils/axiosInstance";
export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData: UserData, thunkAPI) => {
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
