import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    themeBackground: "#99b090",
    themeLightGreen: "#eeffeb",
    themeDarkGreen: "#485244"
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