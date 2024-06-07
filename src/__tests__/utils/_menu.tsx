import { screen } from "@testing-library/react"

export const assertMenu = async () => {
  expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
  expect(await screen.findAllByText("walcron@tm$")).toHaveLength(2)
}
