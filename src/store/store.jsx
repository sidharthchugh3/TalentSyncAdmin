// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./CompanySlice"; // adjust path

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});
