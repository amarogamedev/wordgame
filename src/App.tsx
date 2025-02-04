import theme from "./theme/theme"
import { ChakraProvider, Container } from "@chakra-ui/react"
import { Title } from "./components/Title"
import { Game } from "./components/game/Game"
import { ModalBemVindo } from "./components/ModalBemVindo"

export const App = () => (
  <ChakraProvider theme={theme}>
      <Container justifyItems={"center"} p={8} >
        <ModalBemVindo/>
        <Title />
        <Game />
      </Container>
  </ChakraProvider>
)
