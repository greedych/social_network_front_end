import { Grid } from "@mui/material";
import MainPost from "./mainPost";

function PostsList({ posts }) {
  return (
    <Grid
      container
      justifyContent={"flex-start"}
      gap={"50px"}
      paddingTop={"100px"}
    >
      {posts.map((post) => (
        <MainPost key={post._id} post={post} />
      ))}
    </Grid>
  );
}

export default PostsList;
