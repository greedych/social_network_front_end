import { Grid } from "@mui/material";
import { PostContainer, PostImg, PostsContainer } from "./styles";
import { PostContext } from "../../context/post/postContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../../redux/slices/postSlice";

function MiniPostsList({ posts }) {
  const dispatch = useDispatch();
  const { openPost, togglePost } = useContext(PostContext);

  console.log(openPost);

  const clickToPost = (id) => {
    dispatch(fetchPost(id));
    togglePost();
  };

  return (
    <PostsContainer container>
      {posts?.map((post) => (
        <PostContainer
          key={post._id}
          xs={4}
          onClick={() => clickToPost(post._id)}
        >
          <PostImg component={"img"} src={post.photo} />
        </PostContainer>
      ))}
    </PostsContainer>
  );
}

export default MiniPostsList;
