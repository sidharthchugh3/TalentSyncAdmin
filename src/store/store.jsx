// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/CompanySlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    company: companyReducer,
    auth: authReducer,
  },
});
