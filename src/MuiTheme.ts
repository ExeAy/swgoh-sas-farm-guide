import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#7c3aed",
      light: "#a78bfa",
      dark: "#4c1d95",
    },
    secondary: {
      main: "#ef4444",
      light: "#fca5a5",
    },
  },
  typography: {
    fontSize: 22,
  },
};

const theme = createTheme(themeOptions);

export default theme;
