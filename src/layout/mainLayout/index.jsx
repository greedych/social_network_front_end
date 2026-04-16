import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar";
import CreatePost from "../../components/createPost";
import CreatePostProvider from "../../context/createPost/createPostProvider";
import PostProvider from "../../context/post/postProvider";
import Post from "../../components/post";

function MainLayout() {
  return (
    <PostProvider>
      <CreatePostProvider>
        <Stack flexDirection={"row"} justifyContent={"flex-start"} gap={"15%"}>
          <SideBar />
          <Post />
          <CreatePost />
          <Outlet />
        </Stack>
      </CreatePostProvider>
    </PostProvider>
  );
}

export default MainLayout;
