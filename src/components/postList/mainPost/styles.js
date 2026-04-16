import styled from "@emotion/styled";
import { Avatar, Box, Stack } from "@mui/material";

export const PostImg = styled(Box)({
  width: "400px",
  height: "400px",
});

export const PostAvatar = styled(Avatar)({
  width: "28px",
  height: "28px",
});

export const UserInfoStack = styled(Stack)({
  flexDirection: "row",
  gap: "5px",
  alignItems: "center",
  cursor: "pointer",
});
