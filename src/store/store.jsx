// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/CompanySlice";
import authReducer from "./slices/authSlice"
import jobReducer from "./slices/JobsSlice"
import recruiterReducer from "./slices/recruiterSlice"
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isEmailVerified"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
  reducer: {
    company: companyReducer,
    auth: authReducer,
    jobs: jobReducer,
    recruiter: recruiterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);