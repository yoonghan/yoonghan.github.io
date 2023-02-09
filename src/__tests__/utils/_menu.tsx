import { screen } from "@testing-library/react"

export const assertMenu = async () => {
  expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
}
