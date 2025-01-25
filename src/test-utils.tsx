import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
