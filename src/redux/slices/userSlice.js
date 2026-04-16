import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL + `/user/${data}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.get(BASE_URL + `/user/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(BASE_URL + `/user/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        BASE_URL + `/user/follow/${data}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.delete(BASE_URL + `/user/unfollow/${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    currentUser: {},
    message: "",
    token: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload?.message || action.payload;
        state.user.posts.reverse();
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentUser = action.payload.user;
        state.message = action.payload?.message || action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload?.message || action.payload;
        state.token = action.payload.token;

        localStorage.removeItem("token");
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentUser = action.payload.user;
        state.message = action.payload?.message || action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentUser = action.payload.user;
        state.message = action.payload?.message || action.payload;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });
  },
});

export default userSlice.reducer;
