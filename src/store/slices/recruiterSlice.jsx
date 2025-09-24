// store/recruiterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../api/endpoint";
import apiInstance from "../../api/apiInstance";

const initialState = {
    rprofile: null,
    loading: false,
    error: null,
};

export const createRecruiterProfile = createAsyncThunk("recruiter/createProfile", async (data, { rejectWithValue }) => {
    try {
        const response = await apiInstance.post(endpoints.onboarding.recruiter, data);
        return response.data.data;
    } catch (err) {
        return rejectWithValue(
            err.response?.data?.message ?? "Failed to create recruiter profile"
        );
    }
}
);

export const joinCompany = createAsyncThunk("recruiter/joinCompany", async (companyId, { rejectWithValue }) => {
    try {
        const response = await apiInstance.post(endpoints.onboarding.searchandjoin, { companyId });
        return response.data.data;
    } catch (err) {
        return rejectWithValue(err.response);
    }
}
);

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRecruiterProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRecruiterProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.rprofile = action.payload;
            })
            .addCase(createRecruiterProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default recruiterSlice.reducer;
