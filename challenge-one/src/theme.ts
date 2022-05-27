// import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
// import { StyledEngineProvider } from "@mui/material/styles";

import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#F15F34",
    },
    secondary: {
      main: "#1A224E",
    },
    background: {
      default: "#F5F5F7",
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: "inherit",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: "12px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          height: "40px",
          fontWeight: 600,
          borderRadius: 99,
          boxShadow: "none !important",
          fontSize: "14px",
        },
        fullWidth: {
          maxWidth: "300px",
        },
      },
    },
  },
});

export default theme;
