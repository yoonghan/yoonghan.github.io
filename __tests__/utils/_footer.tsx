import { screen, within } from "@testing-library/react"

export const assertFooter = () => {
  const footer = screen.getByRole("contentinfo")
  expect(within(footer).getByText("Walcron 2014-2023 ©")).toBeInTheDocument()
}
