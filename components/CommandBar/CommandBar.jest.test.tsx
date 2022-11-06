import { render, screen } from "@testing-library/react"
import CommandBar from "."

jest.mock("next/router", () => require("next-router-mock"))

describe("CommandBar", () => {
  it("should render normally", async () => {
    render(<CommandBar />)
    expect(
      screen.queryByRole("img", { name: "walcron-logo" })
    ).not.toBeInTheDocument()
    expect(screen.getByText("Initializing...")).toBeInTheDocument()
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should render without command prompt", () => {
    render(<CommandBar commandPromptOnly={true} />)
    expect(
      screen.queryByRole("img", { name: "walcron-logo" })
    ).not.toBeInTheDocument()
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should render desktop with a logo", () => {
    render(<CommandBar disableMobile={true} />)
    expect(
      screen.getByRole("img", { name: "walcron-logo" })
    ).toBeInTheDocument()
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should render desktop with a logo and no prompt", () => {
    render(<CommandBar disableMobile={true} commandPromptOnly={true} />)
    expect(
      screen.getByRole("img", { name: "walcron-logo" })
    ).toBeInTheDocument()
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })
})
