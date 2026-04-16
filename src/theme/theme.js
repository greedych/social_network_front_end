import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#0095F6",
    },
    secondary: {
      main: "#EFEFEF",
      contrastText: "#000000",
    },
    divider: "#DBDBDB",
    time: "#737373",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
