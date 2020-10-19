import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#247EFF",
    },
    secondary: {
      main: "#d50000",
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: { fontSize: 12 },
    },
  },
});

export default theme;
