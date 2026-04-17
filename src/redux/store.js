import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/usersSlice";
import postReducer from "./slices/postSlice";
import postsReducer from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    posts: postsReducer,
    users: usersReducer,
  },
  devTools: true,
});

export default store;
