import { render, screen } from "@testing-library/react"
import SocialFab from "./"

describe("SocialFab", () => {
  it("should show initialization before loading", async () => {
    render(<SocialFab />)
    expect(screen.getByText("Initializing...")).toBeInTheDocument()
    expect(await screen.findByRole("link", { name: "linkedIn" }))
  })
})
