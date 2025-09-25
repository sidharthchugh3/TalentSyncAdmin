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


export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const response = await authInstance.post(endpoints.auth.loginUser, { email, password });
        return response.data.data;
    } catch (err) {
        console.log(err, 'err anil ')
        return thunkAPI.rejectWithValue({
            message: err?.response?.data?.message || err?.message || "Login failed",
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
