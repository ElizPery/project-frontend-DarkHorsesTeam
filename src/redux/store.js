import { configureStore } from "@reduxjs/toolkit";
import { waterReducer } from "./water/slice";
import { authReducer } from "./auth/slice";

export const store = configureStore({
  reducer: {
    water: waterReducer,
    auth: authReducer,
  },
  // devTools: process.env.NODE_ENV === 'development',
});