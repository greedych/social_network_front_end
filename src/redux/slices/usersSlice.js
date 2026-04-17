import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL + `/user/all`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    message: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.message = action.payload?.message || action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });
  },
});

export default usersSlice.reducer;
