import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../api/endpoint";
import authInstance from "../../api/authInstance";

// Initial state
const initialState = {
    user: null,
    loading: false,
    accessToken: null,
    isEmailVerified: false,
    error: null,
};

// Signup
export const userSignup = createAsyncThunk("auth/signupUser", async (userData, thunkAPI) => {
    try {
        const response = await authInstance.post(endpoints.auth.registerUser, userData);
        return response.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err?.response?.data?.message || err?.message || "Signup failed",
            status: err?.response?.status,
            data: err?.response?.data,
        });
    }
});

// Verify OTP
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ email, otp }, thunkAPI) => {
    try {
        const response = await authInstance.post(endpoints.auth.verifyOtp, { email, otp });
        return response.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err?.response?.data?.message || err?.message || "OTP verification failed",
            status: err?.response?.status,
            data: err?.response?.data,
        });
    }
});

// Login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const response = await authInstance.post(endpoints.auth.loginUser, { email, password });
        return response.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err?.response?.data?.message || err?.message || "Login failed",
            status: err?.response?.status,
            data: err?.response?.data,
        });
    }
});

// Resend OTP
export const resendOtp = createAsyncThunk("auth/resendOtp", async ({ email }, thunkAPI) => {
    try {
        const response = await authInstance.post(endpoints.auth.resendOtp, { email });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err?.response?.data?.message || err?.message || "Resend OTP failed",
            status: err?.response?.status,
            data: err?.response?.data,
        });
    }
});

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isEmailVerified = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isEmailVerified = false;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("pendingEmail", action.payload.user.email);
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Unknown signup error" };
            })

         

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Unknown login error" };
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
