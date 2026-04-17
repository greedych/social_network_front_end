import { useContext, useEffect, useState } from "react";
import { followUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostAvatar, PostImg, UserInfoStack } from "./styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { fetchPost, likePost } from "../../../redux/slices/postSlice";
import { PostContext } from "../../../context/post/postContext";

function MainPost({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { togglePost } = useContext(PostContext);
  const [isLike, setIsLike] = useState(post.likes?.includes(currentUser?._id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (!payload.exp) return null;

      if (+payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (post && currentUser) {
      setIsLike(post.likes?.includes(currentUser._id));
    }
  }, [post, currentUser]);

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  const isFollow = currentUser?.following?.includes(post.user?._id);

  const followToUser = async () => {
    try {
      const result = await dispatch(followUser(post.user._id)).unwrap();

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const likingPost = async () => {
    setIsLike((prev) => !prev);
    setLikesCount((prev) => (!isLike ? prev + 1 : prev - 1));

    try {
      const result = await dispatch(likePost(post._id));

      console.log(result);
    } catch (e) {
      console.error(e);
      setIsLike((prev) => !prev);
      setLikesCount((prev) => (isLike ? prev + 1 : prev - 1));
    }
  };

  const clickToPost = () => {
    dispatch(fetchPost(post._id));
    togglePost();
  };

  const timeAgo = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date().getTime();
    const diff = Math.floor((now - date.getTime()) / 1000);

    if (diff < 60) return "now";
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  const toUserProfile = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <Grid xs={6} paddingBottom={"30px"} borderBottom={"1px solid #DBDBDB"}>
      <Stack gap={"10px"}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
          <UserInfoStack onClick={() => toUserProfile(post.user._id)}>
            <PostAvatar src={post.user.avatar} />
            <Typography>{post.user.username}</Typography>
            <Typography variant="body2" color="#BEBEBE">
              {timeAgo(post.createdAt)}
            </Typography>
          </UserInfoStack>
          {token && token.id !== post.user._id && !isFollow && (
            <Button onClick={() => followToUser(post.user._id)} size="small">
              Follow
            </Button>
          )}
        </Stack>
        <PostImg
          component={"img"}
          src={post.photo}
          onClick={clickToPost}
          sx={{ cursor: "pointer" }}
        />
        <Stack flexDirection={"row"} gap={"10px"}>
          {!isLike ? (
            <FavoriteBorderIcon
              sx={{ cursor: "pointer" }}
              onClick={likingPost}
            />
          ) : (
            <FavoriteIcon sx={{ cursor: "pointer" }} onClick={likingPost} />
          )}
          <ModeCommentOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={clickToPost}
          />
        </Stack>
        <Typography variant="body2" fontWeight={500}>
          {likesCount} likes
        </Typography>
        {post.text && (
          <UserInfoStack>
            <Typography variant="body2" fontWeight={500}>
              {post.user.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                width: "200px",
                textOverflow: "ellipsis",
              }}
            >
              {post.text}
            </Typography>
          </UserInfoStack>
        )}
        {post.comments.length !== 0 && (
          <Typography
            variant="body2"
            onClick={clickToPost}
            color="time"
            sx={{ cursor: "pointer" }}
          >
            View all comments ({post.comments.length})
          </Typography>
        )}
      </Stack>
    </Grid>
  );
}

export default MainPost;
