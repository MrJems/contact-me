import { createTheme } from "@mui/material/styles";

// Example "rose-red" value
// You might find a nice shade like #e91e63 or #FF007F etc.
// Adjust to your preferred rose-red color:
const roseRed = "#E91E63";

const theme = createTheme({
  palette: {
    primary: {
      main: roseRed,
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  // Customize other theme parts if needed
});

export default theme;
