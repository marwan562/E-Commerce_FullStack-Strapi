import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { queryProductsApi } from "./queries/getProductsApi";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import AuthUserSlice from "./reducer/auth/AuthUserSlice";
import cartSlice from "./reducer/Cart/cartSlice";
import { queryCartsApi } from "./reducer/Cart/actCart/carQuery";
import { productsDashboard } from "./queries/productsDashboard";
import { categoriesApiQuery } from "./queries/categoriesApiQuery";

// Persist configuration for the root state
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Corrected from whiteList to whitelist
};

// Persist configuration for the auth state
const authPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userData"], // Corrected from whiteList to whitelist
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"], // Corrected from whiteList to whitelist
};

// Combine reducers with persisted reducers
const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, AuthUserSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
  [queryProductsApi.reducerPath]: queryProductsApi.reducer,
  [queryCartsApi.reducerPath]: queryCartsApi.reducer, // Added queryCartsApi reducer
  [productsDashboard.reducerPath]: productsDashboard.reducer,
  [categoriesApiQuery.reducerPath]: categoriesApiQuery.reducer,
});

// Apply persistence to the combined reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      queryProductsApi.middleware,
      queryCartsApi.middleware,
      productsDashboard.middleware,
      categoriesApiQuery.middleware
    ), // Added queryCartsApi middleware
});

// Set up the persistor
export const persistor = persistStore(store);

// Define TypeScript types for the state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
