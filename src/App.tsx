import * as React from "react"
import theme from "./theme/theme"
import { ChakraProvider, Container } from "@chakra-ui/react"
import { Title } from "./components/Title"
import { Game } from "./components/game/Game"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container justifyItems={"center"} p={8}>
      <Title />
      <Game />
    </Container>
  </ChakraProvider>
)
