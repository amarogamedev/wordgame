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
    base: "640px",
    sm: "960px",
    md: "1280px",
    lg: "1440px",
    xl: "1920px",
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