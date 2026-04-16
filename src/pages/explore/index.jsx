import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";
import MiniPostsList from "../../components/miniPostsList";

function Explore() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Stack marginRight={"15%"} paddingTop={"100px"}>
      <MiniPostsList posts={posts} />
    </Stack>
  );
}

export default Explore;
