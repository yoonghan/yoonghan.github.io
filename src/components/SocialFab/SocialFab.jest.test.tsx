import { render, screen } from "@testing-library/react"
import SocialFab from "."

describe("SocialFab", () => {
  it("should load with social links", async () => {
    render(<SocialFab />)
    expect(await screen.findByRole("link", { name: "linkedIn" }))
  })
})
