import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  fetchUser,
  followUser,
  unfollowUser,
} from "../../redux/slices/userSlice";
import baseAvatar1 from "../../assets/baseAvatar1.jpg";
import baseAvatar2 from "../../assets/baseAvatar2.jpg";
import baseAvatar3 from "../../assets/baseAvatar3.jpg";
import baseAvatar4 from "../../assets/baseAvatar4.jpg";
import baseAvatar5 from "../../assets/baseAvatar5.jpg";
import baseAvatar6 from "../../assets/baseAvatar6.jpg";
import baseAvatar7 from "../../assets/baseAvatar7.jpg";
import baseAvatar8 from "../../assets/baseAvatar8.jpg";
import baseAvatar9 from "../../assets/baseAvatar9.jpg";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { CreatePostContext } from "../../context/createPost/createPostContext";
import { PostImg, UserAvatar, UserInfoStak, UserPageStak } from "./styles";
import MiniPostsList from "../../components/miniPostsList";

const baseAvatars = [
  baseAvatar1,
  baseAvatar2,
  baseAvatar3,
  baseAvatar4,
  baseAvatar5,
  baseAvatar6,
  baseAvatar7,
  baseAvatar8,
  baseAvatar9,
];

function User() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);
  const [random] = useState(() =>
    Math.floor(Math.random() * baseAvatars.length),
  );
  const { toggleCreate } = useContext(CreatePostContext);
  const { user, currentUser, isLoading, isError, message } = useSelector(
    (state) => state.user,
  );

  const isFollow = currentUser?.following?.includes(userId);

  const navigateEditUser = () => {
    navigate("/user/edit");
  };
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
  const followToUser = async () => {
    try {
      const result = await dispatch(followUser(userId)).unwrap();
      await dispatch(fetchUser(userId)).unwrap();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const unfollowToUser = async () => {
    try {
      const result = await dispatch(unfollowUser(userId)).unwrap();
      await dispatch(fetchUser(userId)).unwrap();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  useEffect(() => {
    setPosts(user.posts);
  }, [user]);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading) return <Typography variant="h1">Loading...</Typography>;
  if (isError) return <Typography variant="h1">{message}</Typography>;

  return (
    <UserPageStak>
      <UserInfoStak>
        <UserAvatar src={user?.avatar || baseAvatars[random]} />
        <Stack marginTop={1} gap={"20px"}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={"25px"}>
            <Typography>{user.username}</Typography>
            {currentUser?._id === user?._id && (
              <Button
                color="secondary"
                variant="contained"
                onClick={navigateEditUser}
              >
                Edit profile
              </Button>
            )}
            {token && currentUser?._id !== user?._id && !isFollow && (
              <Button onClick={followToUser} variant="contained">
                Follow
              </Button>
            )}
            {currentUser?._id !== user?._id && isFollow && (
              <Button
                onClick={unfollowToUser}
                variant="contained"
                color="secondary"
              >
                Unfollow
              </Button>
            )}
          </Stack>
          <Stack flexDirection={"row"} gap={"60px"}>
            <Typography>{user.posts?.length} posts</Typography>
            <Typography>{user.followers?.length} followers</Typography>
            <Typography>{user.following?.length} following</Typography>
          </Stack>
        </Stack>
      </UserInfoStak>
      {((!user.posts && token?.id === userId) ||
        (user.posts?.length === 0 && token?.id === userId)) && (
        <Stack paddingTop={"60px"} alignItems={"center"} gap={3} width={"100%"}>
          <AddAPhotoOutlinedIcon sx={{ fontSize: 120 }} variant="outlined" />
          <Typography variant="h2" fontWeight={700}>
            Share Photos
          </Typography>
          <Typography>
            When you share photos, they will apper on your profile.
          </Typography>
          <Button onClick={toggleCreate}>Share your first photo</Button>
        </Stack>
      )}
      {user.posts && <MiniPostsList posts={posts} />}
    </UserPageStak>
  );
}

export default User;
