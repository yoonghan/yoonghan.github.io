import { render, screen } from "@testing-library/react"
import CommandBar from "./"

jest.mock("next/router", () => require("next-router-mock"))

describe("CommandBar", () => {
  it("should show initialization before loading", async () => {
    render(<CommandBar />)
    expect(screen.getByText("Initializing...")).toBeInTheDocument()
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  })
})
