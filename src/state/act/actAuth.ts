import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import { UserDataLogin, UserDataSignUp, Grade } from "../../utils/types/DTO";
import {
  LoginResponse,
  ResponseSubject,
  ResponseChapters,
  ResponsePoints,
} from "../../utils/dataResponse";

interface ResponseCreate {
  message: string;
}

export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData: UserDataSignUp, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("userData from slice is", userData);
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
      return rejectWithValue(error.response.data);
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
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        // Handle 403 error here
        // Example: setConfirmed(true);
        console.log("400 Forbidden - User not authorized from slice");
      }
      return rejectWithValue(error);
    }
  }
);
export const getSubjects = createAsyncThunk(
  "authSlice/getSubjects",
  async ({ grade }: { grade: Number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get<ResponseSubject>(
        `/api/Accounts/subjects/${grade}`
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
export const getChapters = createAsyncThunk(
  "authSlice/getChapters",
  async ({ grade, subject }: { grade: number; subject: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post<ResponseChapters>(
        "/api/Accounts/chapters",
        { grade, subject }
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
export const forgetPassword = createAsyncThunk(
  "authSlice/forgetPassword",
  async ({ email }: { email: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/Accounts/ForgetPassword", {
        email,
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
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "authSlice/resetPassword",
  async (
    {
      token,
      email,
      password,
    }: { token: string; email: string; password: string },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post("/api/Accounts/ResetPassword", {
        token,
        email,
        password,
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPoints = createAsyncThunk(
  "authSlice/addPoints",
  async ({ points }: { points: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get<ResponsePoints>(
        `/api/Accounts/add/${points}`,
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
export const changePassword = createAsyncThunk(
  "authSlice/changePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        `/api/Accounts/ChangePassword`,
        { oldPassword, newPassword },
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
