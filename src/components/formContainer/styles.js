import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const FormStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1px",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(5),
  gap: theme.spacing(4.5),
  marginTop: "100px",
}));

export const NovigationBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1px",
  justifyContent: "center",
  alignItems: "center",
  padding: "11px 60px",
  flexDirection: "row",
  gap: theme.spacing(0.5),
}));
