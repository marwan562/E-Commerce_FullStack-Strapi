import { configureStore } from "@reduxjs/toolkit";
import { queryProductsApi } from "./queries/getProductsApi";
import { useDispatch, useSelector } from "react-redux";
import AuthUserSlice from "./reducer/auth/AuthUserSlice";

export const store = configureStore({
  reducer: {
    user:AuthUserSlice,
    [queryProductsApi.reducerPath]: queryProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queryProductsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
