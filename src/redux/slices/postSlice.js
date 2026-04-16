import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(BASE_URL + `/post/create`, data, {
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

export const likePost = createAsyncThunk(
  "post/likePost",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        BASE_URL + `/post/like/${data}`,
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

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL + `/post/${data}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(BASE_URL + `/post/delete/${data}`, {
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

export const createComment = createAsyncThunk(
  "post/createComment",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        BASE_URL + `/post/comment/create/${data.postId}`,
        { text: data.text },
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

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    message: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post = action.payload.post;
        state.message = action.payload?.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post = action.payload.post;
        state.message = action.payload?.message;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post.likes = action.payload.updatedPost.likes;
        state.message = action.payload?.message;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post.post = action.payload.post;
        state.message = action.payload?.message;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
      });
  },
});

export default postSlice.reducer;
