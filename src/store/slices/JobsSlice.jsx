import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";
import { endpoints } from "../../api/endpoint";

const initialState = {
    jobs: [],
    loading: false,
    error: null,
    successMessage: null,
};

export const createJob = createAsyncThunk("jobs/createJob", async (jobData, { rejectWithValue }) => {
    try {
        console.log("jobs data ", jobData)
        const res = await apiInstance.post(endpoints.jobs.createJob, jobData);
        console.log(res, "res in the slice")
        return res.data.data;
    } catch (err) {
        return rejectWithValue(
            err.response?.data?.message || "Failed to create job"
        );
    }
}
);

export const fetchAllJobs = createAsyncThunk("jobs/fetchAllJobs", async (_, { rejectWithValue }) => {
    try {
        const res = await apiInstance.post(endpoints.jobs.fetchAllJobs);
        return res.data.data;
    } catch (err) {
        return rejectWithValue(
            err.response?.data?.message || "Failed to fetch jobs"
        );
    }
}
);

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        clearJobMessages: (state) => {
            state.successMessage = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create Job
        builder.addCase(createJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs.push(action.payload.job);
            state.successMessage = action.payload.message;
        });
        builder.addCase(createJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });

        // Fetch Jobs
        builder.addCase(fetchAllJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload.jobs;
        });
        builder.addCase(fetchAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
    },
});

export const { clearJobMessages } = jobsSlice.actions;
export default jobsSlice.reducer;
