// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/CompanySlice";
import authReducer from "./slices/authSlice"
import jobReducer from "./slices/JobsSlice"
import recruiterReducer from "./slices/recruiterSlice"

export const store = configureStore({
  reducer: {
    company: companyReducer,
    auth: authReducer,
    jobs: jobReducer,
    recruiter: recruiterReducer,
  },
});
