import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

export const PostPhoto = styled(Box)(({ theme }) => ({
  width: "550px",
  height: "550px",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

export const PostTitleStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "15px",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "10px",
}));

export const CommentForm = styled(Stack)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
}));

export const TimeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.time,
}));
