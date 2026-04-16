import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const SideBarPositionBox = styled(Box)({
  position: "sticky",
  top: 0,
  alignSelf: "flex-start",
  height: "100vh",
});

export const SideBarStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  gap: theme.spacing(5.5),
  height: "100vh",
}));

export const SideBarLink = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  // cursor: "pointer",
}));
