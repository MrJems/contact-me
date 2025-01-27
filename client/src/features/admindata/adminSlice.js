import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../api/userApi";

// Async thunk to fetch all users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers", // Action type
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching user data...");
      const response = await fetchUserData();
      return response; // Assume the API returns the full response, including "message" and "users"
    } catch (error) {
      console.error("Error fetching user data:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    message: "",
    admin: false,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.admin = action.payload.admin;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
