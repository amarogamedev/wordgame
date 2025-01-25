import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  breakpoints: {
    base: "320px",
    sm: "600px",
    md: "900px",
    lg: "1280px",
    xl: "1366px",
  },
});

export default theme;