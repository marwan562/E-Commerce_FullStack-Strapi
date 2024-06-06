import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// register

export const actRegister = createAsyncThunk(
  "authUserSlice/actSignUp",
  async (
    data: { username: string; email: string; password: string },
    thunkApi
  ) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local/register`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message);
    }
  }
);

//login

export const actLogin = createAsyncThunk(
  "authUserSlice/actLogin",
  async (data: { identifier: string; password: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        data
      );

      return res.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response.data.error.message);
      }
    }
  }
);
