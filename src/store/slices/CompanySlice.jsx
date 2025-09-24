// store/companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";
import { endpoints } from "../../api/endpoint";

// Async Thunks
export const createCompany = createAsyncThunk("company/createCompany", async (companyData, { rejectWithValue }) => {
  try {
    const res = await apiInstance.post(endpoints.company.createCompany, companyData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response || "Failed to create company");
  }
}
);

export const fetchAllCompanies = createAsyncThunk("company/fetchAllCompanies", async (_, { rejectWithValue }) => {
  try {
    const res = await apiInstance.post(endpoints.company.fetchAllCompanies);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response || "Failed to fetch companies");
  }
}
);

export const fetchRecruiterCompanies = createAsyncThunk("company/fetchRecruiterCompanies", async (searchQuery, { rejectWithValue }) => {
  try {
    const res = await apiInstance.post(endpoints.company.fetchRecruiterCompanies, { searchQuery });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response || "Failed to fetch companies");
  }
}
);

// Initial State
const initialState = {
  associatedCompanies: [],
  allCompanies: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompanyMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Company
    builder.addCase(createCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.allCompanies.push(action.payload.company);
        state.associatedCompanies.push(action.payload.company);
        state.successMessage = action.payload.message;
      } else {
        state.error = action.payload.message || "Failed to create company";
      }
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch All Companies
    builder.addCase(fetchAllCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.allCompanies = action.payload.companies;
        state.successMessage = action.payload.message;
      } else {
        state.error = action.payload.message || "Failed to fetch companies";
      }
    });
    builder.addCase(fetchAllCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Recruiter Companies
    builder.addCase(fetchRecruiterCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecruiterCompanies.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.associatedCompanies = action.payload.associatedCompanies;
        state.allCompanies = action.payload.allCompanies;
        state.successMessage = action.payload.message;
      } else {
        state.error = action.payload.message || "Failed to fetch recruiter companies";
      }
    });
    builder.addCase(fetchRecruiterCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearCompanyMessages } = companySlice.actions;
export default companySlice.reducer;
