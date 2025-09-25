// src/store/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/CompanySlice";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/JobsSlice";
import recruiterReducer from "./slices/recruiterSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// --- Persist Config for auth slice ---
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isEmailVerified"],
};

// --- Persisted reducer ---
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// --- Configure store ---
export const store = configureStore({
  reducer: {
    company: companyReducer,
    auth: persistedAuthReducer, // use persisted reducer here
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

// --- Persistor ---
export const persistor = persistStore(store);
