import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme/theme"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
