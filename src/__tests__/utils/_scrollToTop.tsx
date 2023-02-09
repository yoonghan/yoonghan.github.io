import { screen } from "@testing-library/react"

export const assertScrollToTop = async () => {
  expect(await screen.findByTestId("scroll-to-top")).toBeInTheDocument()
}
