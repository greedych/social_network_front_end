import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

export const PostsContainer = styled(Grid)({
  gap: "2px",
});

export const PostContainer = styled(Grid)({
  width: "270px",
  height: "270px",
  gobjectFit: "cover",
});

export const PostImg = styled(Box)({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  transition: "all 0.11s ease",
  "&:hover": {
    filter: "brightness(70%)",
  },
});
