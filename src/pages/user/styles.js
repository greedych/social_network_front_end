import styled from "@emotion/styled";
import { Avatar, Stack } from "@mui/material";

export const PostImg = styled("img")({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

export const UserAvatar = styled(Avatar)({
  width: "150px",
  height: "150px",
  marginTop: "30px",
});

export const UserPageStak = styled(Stack)({
  alignItems: "flex-start",
  gap: "55px",
  marginRight: "15%",
});

export const UserInfoStak = styled(Stack)({
  flexDirection: "row",
  gap: "100px",
  justifyContent: "center",
  marginTop: "30px",
  maxWidth: "975px",
});
