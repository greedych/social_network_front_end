import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";

export const RegisterForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const RegisterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: theme.spacing(1),
}));

export const ErrorText = styled(Typography)({
  color: "#f00000",
});
