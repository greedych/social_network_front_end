import styled from "@emotion/styled";
import { Stack, TextField, Typography } from "@mui/material";

export const ModalStack = styled(Stack)(({ theme }) => ({
  background: "#fff",
  borderRadius: theme.spacing(1),
}));

export const LoadPhotoStack = styled(Stack)(({ theme }) => ({
  background: "#eeeded",
  height: "550px",
  width: "550px",
  justifyContent: "center",
  alignItems: "center",
  borderRight: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    background: "#e0e0e0",
  },
  cursor: "pointer",
}));

export const CreatePostTitle = styled(Typography)({
  padding: "10px 0",
  textAlign: "center",
  fontWeight: 500,
});

export const TitleStack = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "relative",
}));

export const PostTextInput = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  width: "300px",
});

export const BoxTextInput = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
}));

export const PostPhoto = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRight: `1px solid ${theme.palette.divider}`,
  objectFit: "cover",
}));
