import * as React from "react"
import {
  ChakraProvider,
  defaultSystem
} from "@chakra-ui/react"
export const App = () => (
  <ChakraProvider value={defaultSystem}>
    <></>
  </ChakraProvider>
)
