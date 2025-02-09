import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import { UserDataLogin, UserDataSignUp } from "../../utils/types/DTO";
import { LoginResponse } from "../../utils/dataResponse";

interface ResponseCreate {
  message: string;
}

export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData: UserDataSignUp, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<ResponseCreate>(
        "/api/Accounts/register",
        userData
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
export const logIn = createAsyncThunk(
  "authSlice/logIn",
  async (userData: UserDataLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<LoginResponse>(
        // The <LoginResponse> generic tells TypeScript what type the response should be.
        // This ensures res.data will be automatically typed as LoginResponse.

        // Inside createAsyncThunk<T>()
        // createAsyncThunk<User[]>("users/fetchUsers", async () => { ... })
        // 	Ensures the entire thunk function returns the expected type.

        // Axios (axiosInstance.post<T>()) ensures the API response is correctly typed.
        // createAsyncThunk<T>() ensures the entire Redux thunk function returns the correct type.

        // But they are related! In most cases,
        // you'd use both together to enforce type safety from API request to Redux state.
        "/api/Accounts/login",
        userData
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
