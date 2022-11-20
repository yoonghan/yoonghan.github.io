import { screen } from "@testing-library/react"

export const assertMenu = async () => {
  expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
}
