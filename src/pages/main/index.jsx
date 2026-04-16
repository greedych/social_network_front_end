import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { Stack, Typography } from "@mui/material";
import PostsList from "../../components/postList";

function Main() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  return (
    <Stack>
      <PostsList posts={posts} />
    </Stack>
  );
}

export default Main;
