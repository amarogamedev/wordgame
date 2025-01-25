import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    themeBackground: "#262626",
    themeGreen: "#8ed672",
    themeDarkGrey: "#333333",
    themeYellow: "#f5c269"
  },
  breakpoints: {
    base: "320px",
    sm: "600px",
    md: "900px",
    lg: "1280px",
    xl: "1366px",
  },
  styles: {
    global: {
      body: {
        bg: "themeBackground",
      },
    },
  },
});

export default theme;