import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { setUserDataAction } from "../AuthUserSlice";
import CookieService from "../../../../services/CookieService";

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
      return rejectWithValue(err?.response?.data?.error?.message);
    }
  }
);

//login

export const actLogin = createAsyncThunk(
  "authUserSlice/actLogin",
  async (data: { identifier: string; password: string }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        data
      );

      const date = new Date();
      const IN_DAYS = 3;
      const EXPIRES_IN_DAY = 1000 * 60 * 60 * 24 * IN_DAYS;
      date.setTime(date.getTime() + EXPIRES_IN_DAY);
      CookieService.set("jwt", res?.data?.jwt, {
        path: "/",
        expires: date,
      });
      dispatch(setUserDataAction(res.data));
      return res.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err?.response?.data?.error?.message);
      }
    }
  }
);
