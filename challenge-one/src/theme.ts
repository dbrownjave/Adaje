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
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

// export default function ThemeProvider({ children }) {
//   return (
//     <MuiThemeProvider theme={theme}>
//       {/* Inject emotion before JSS */}
//       <StyledEngineProvider injectFirst>
//         <CssBaseline />
//         {children}
//         {/* Your component tree. Now you can override MUI's styles. */}
//       </StyledEngineProvider>
//     </MuiThemeProvider>
//   );
// }

export default theme;
