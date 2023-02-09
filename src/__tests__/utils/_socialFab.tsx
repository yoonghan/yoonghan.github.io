import { screen } from "@testing-library/react"

export const assertSocialFab = async () => {
  expect(await screen.findByRole("link", { name: "git" })).toBeInTheDocument()
}
