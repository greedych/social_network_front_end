import {
  Avatar,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostContext } from "../../context/post/postContext";
import {
  createComment,
  fetchPost,
  // deletePost,
  likePost,
} from "../../redux/slices/postSlice";
// import { fetchUser } from "../../redux/slices/userSlice";
import { CommentForm, PostPhoto, PostTitleStack, TimeText } from "./styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import LikeSection from "../likeSection";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { useForm } from "react-hook-form";
import CommentBox from "./commentBox";

function Post() {
  const navigate = useNavigate();
  const { openPost, togglePostParent, togglePost } = useContext(PostContext);
  const { currentUser } = useSelector((state) => state.user);
  const { post, isLoading } = useSelector((state) => state.post);
  const { register, handleSubmit, reset } = useForm();
  // const [isLike, setIsLike] = useState(
  //   post.likes?.includes(currentUser?._id) || false,
  // );
  // const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const dispatch = useDispatch();

  const isLike = post?.likes?.includes(currentUser?._id);
  const likesCount = post?.likes?.length || 0;
  const isFollow = currentUser?.following?.includes(post.user?._id);

  // const removePost = () => {
  //   dispatch(deletePost(post._id));
  //   togglePost();
  //   dispatch(fetchUser(post.user._id));
  // };

  const timeAgo = () => {
    const date = new Date(post.createdAt);
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diff < 60) return "now";
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  const toUserProfile = () => {
    togglePost();
    navigate(`/user/${post.user._id}`);
  };

  const onLike = async () => {
    // setIsLike((prev) => !prev);
    // setLikesCount((prev) => (!isLike ? prev + 1 : prev - 1));

    try {
      const result = await dispatch(likePost(post._id));
      dispatch(fetchPosts());
      console.log(result);
    } catch (e) {
      console.error(e);
      // setIsLike((prev) => !prev);
      // setLikesCount((prev) => (isLike ? prev + 1 : prev - 1));
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        createComment({ postId: post._id, text: data.text }),
      );
      reset();
      dispatch(fetchPost(post._id));
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading)
    return (
      <Stack sx={{ background: "white", padding: "40px" }}>
        <Typography variant="h2">Loading...</Typography>
      </Stack>
    );

  return (
    <Modal open={openPost}>
      <Stack
        width={"100%"}
        height={"100%"}
        onClick={togglePostParent}
        sx={{ cursor: "pointer" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack sx={{ background: "black", flexDirection: "row" }}>
          <PostPhoto component={"img"} src={post.photo} />
          <Stack
            sx={{
              background: "#fff",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <PostTitleStack>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  paddingRight={"100px"}
                  gap={"20px"}
                >
                  <Stack
                    gap={"5px"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    onClick={toUserProfile}
                  >
                    <Avatar
                      height={"28px"}
                      width={"28px"}
                      src={post.user?.avatar}
                    />
                    <Typography>{post.user?.username}</Typography>
                  </Stack>
                  {currentUser &&
                    currentUser?._id !== post.user?._id &&
                    !isFollow && <Button size="small">Follow</Button>}
                </Stack>
                <MoreHorizIcon />
              </PostTitleStack>
              {post.text && <CommentBox comment={post} />}
              {post?.comments?.length !== 0 &&
                post.comments?.map((comment) => (
                  <CommentBox comment={comment} />
                ))}
            </Stack>
            <Stack>
              <Stack padding={"10px"} gap={"10px"}>
                <Stack flexDirection={"row"} gap={"5px"}>
                  {isLike ? (
                    <FavoriteIcon onClick={onLike} />
                  ) : (
                    <FavoriteBorderIcon onClick={onLike} />
                  )}
                  <Typography>{likesCount} likes</Typography>
                </Stack>
                <TimeText variant="body2">{timeAgo()}</TimeText>
              </Stack>
              <CommentForm component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("text", { required: true })}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& input::placeholder": {
                      fontSize: "14px",
                    },
                  }}
                  placeholder="Add comment"
                />
                <Button type="submit">Send</Button>
              </CommentForm>
            </Stack>
            {/* <Button onClick={removePost}>Delete</Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default Post;
