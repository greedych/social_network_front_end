import { Avatar, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { SideBarLink, SideBarPositionBox, SideBarStack } from "./styles";
import { useContext, useEffect, useState } from "react";
import { CreatePostContext } from "../../context/createPost/createPostContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/slices/userSlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
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
  const [token] = useState(() => getToken());

  const { toggleCreate } = useContext(CreatePostContext);

  const toHome = () => {
    navigate("/");
  };

  const toExplore = () => {
    navigate("/explore");
  };

  const toProfile = () => {
    navigate(`/user/${token.id}`);
  };

  const toLogin = () => {
    navigate(`/login`);
  };

  useEffect(() => {
    if (!token) return;
    dispatch(fetchCurrentUser());
  }, [dispatch, token]);

  return (
    <SideBarPositionBox>
      <SideBarStack>
        <Typography variant="h4" fontWeight={700}>
          5gramm
        </Typography>
        <Stack flexDirection={"column"} gap={2}>
          <SideBarLink onClick={toHome} sx={{ cursor: "pointer" }}>
            <HomeOutlinedIcon sx={{ fontSize: 24 }} />
            <Typography variant="body2" textAlign={"center"} fontWeight={500}>
              Home
            </Typography>
          </SideBarLink>
          <SideBarLink sx={{ cursor: "pointer" }}>
            <SearchIcon sx={{ fontSize: 24 }} />
            <Typography variant="body2" textAlign={"center"} fontWeight={500}>
              Search
            </Typography>
          </SideBarLink>
          <SideBarLink sx={{ cursor: "not-allowed" }}>
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: 24, color: "#BEBEBE" }}
            />
            <Typography
              variant="body2"
              textAlign={"center"}
              fontWeight={500}
              color="#BEBEBE"
            >
              Notifications
            </Typography>
          </SideBarLink>
          <SideBarLink sx={{ cursor: "not-allowed" }}>
            <SmsOutlinedIcon sx={{ fontSize: 24, color: "#BEBEBE" }} />
            <Typography
              variant="body2"
              textAlign={"center"}
              fontWeight={500}
              color="#BEBEBE"
            >
              Messages
            </Typography>
          </SideBarLink>
          <SideBarLink onClick={toExplore} sx={{ cursor: "pointer" }}>
            <ExploreOutlinedIcon sx={{ fontSize: 24 }} />
            <Typography variant="body2" textAlign={"center"} fontWeight={500}>
              Explore
            </Typography>
          </SideBarLink>
          {token ? (
            <SideBarLink onClick={toggleCreate} sx={{ cursor: "pointer" }}>
              <AddBoxOutlinedIcon sx={{ fontSize: 24 }} />
              <Typography variant="body2" textAlign={"center"} fontWeight={500}>
                Create
              </Typography>
            </SideBarLink>
          ) : (
            <SideBarLink sx={{ cursor: "not-allowed" }}>
              <AddBoxOutlinedIcon sx={{ fontSize: 24, color: "#BEBEBE" }} />
              <Typography
                variant="body2"
                textAlign={"center"}
                color="#BEBEBE"
                fontWeight={500}
              >
                Create
              </Typography>
            </SideBarLink>
          )}
        </Stack>
        {token ? (
          <SideBarLink onClick={toProfile} sx={{ cursor: "pointer" }}>
            <Avatar
              sx={{ width: "24px", height: "24px" }}
              src={currentUser.avatar}
            />
            <Typography variant="body2" fontWeight={500}>
              Profile
            </Typography>
          </SideBarLink>
        ) : (
          <SideBarLink onClick={toLogin} sx={{ cursor: "pointer" }}>
            <LoginIcon sx={{ fontSize: 24 }} color="primary" />
            <Typography variant="body2" color="primary" fontWeight={500}>
              Login
            </Typography>
          </SideBarLink>
        )}
      </SideBarStack>
    </SideBarPositionBox>
  );
}

export default SideBar;
