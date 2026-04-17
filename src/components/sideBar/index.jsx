import {
  Avatar,
  Box,
  Drawer,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
import { fetchUsers } from "../../redux/slices/usersSlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  const toUser = (id) => {
    navigate(`/user/${id}`);
    setOpenSearch((prev) => !prev);
  };

  const toLogin = () => {
    navigate(`/login`);
  };

  const query = inputValue.toLowerCase().trim();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query),
  );

  const onSearch = () => {
    setOpenSearch((prev) => !prev);
    dispatch(fetchUsers());
  };

  useEffect(() => {
    if (!token) return;
    dispatch(fetchCurrentUser());
  }, [dispatch, token]);

  return (
    <Stack position={"relative"}>
      <SideBarPositionBox>
        <SideBarStack>
          <Typography
            onClick={toHome}
            variant="h4"
            fontWeight={700}
            sx={{ cursor: "pointer" }}
          >
            5gramm
          </Typography>
          <Stack flexDirection={"column"} gap={2}>
            <SideBarLink onClick={toHome} sx={{ cursor: "pointer" }}>
              <HomeOutlinedIcon sx={{ fontSize: 24 }} />
              <Typography variant="body2" textAlign={"center"} fontWeight={500}>
                Home
              </Typography>
            </SideBarLink>
            <SideBarLink sx={{ cursor: "pointer" }} onClick={onSearch}>
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
                <Typography
                  variant="body2"
                  textAlign={"center"}
                  fontWeight={500}
                >
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

      <Stack
        sx={{
          position: "absolute",
          left: "100%", // 👈 прямо рядом с сайдбаром
          top: 0,
          height: "100%",
          transform: openSearch ? "translateX(0)" : "translateX(-20px)",
          opacity: openSearch ? 1 : 0,
          pointerEvents: openSearch ? "auto" : "none",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
      >
        <Stack
          sx={{
            position: "sticky",
            // left: "100%", // 👈 прямо рядом с сайдбаром
            top: 0,
            height: "100vh",
            bgcolor: "#fff",
            boxShadow: 3,
            // transform: openSearch ? "translateX(0)" : "translateX(-20px)",
            // opacity: openSearch ? 1 : 0,
            // pointerEvents: openSearch ? "auto" : "none",
            // transition: "all 0.3s ease",
            // zIndex: 10,
            p: 2,
            borderTopRightRadius: 16,
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            Search
          </Typography>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            placeholder="Search"
            variant="outlined"
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
              background: "#DBDBDB",
              color: "#737373",
              borderRadius: 2,
              width: "200px",
            }}
          />
          <Stack gap={1}>
            {filteredUsers.map((user) => (
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                gap={"5px"}
                onClick={() => toUser(user._id)}
                sx={{ cursor: "pointer" }}
              >
                <Avatar src={user.avatar} />
                <Typography>{user.username}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SideBar;
