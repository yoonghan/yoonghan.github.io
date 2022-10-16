import { render, screen } from "@testing-library/react"
import CommandBarNoSSR from "./CommandBarNoSSR"

jest.mock("next/router", () => require("next-router-mock"))

describe("CommandBarNoSSR", () => {
  it("should render normally", () => {
    render(<CommandBarNoSSR />)
    expect(
      screen.queryByRole("img", { name: "walcron-logo" })
    ).not.toBeInTheDocument()
  })

  it("should render without command prompt", () => {
    render(<CommandBarNoSSR commandPromptOnly={true} />)
    expect(
      screen.queryByRole("img", { name: "walcron-logo" })
    ).not.toBeInTheDocument()
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should render desktop with a logo", () => {
    render(<CommandBarNoSSR disableMobile={true} />)
    expect(
      screen.getByRole("img", { name: "walcron-logo" })
    ).toBeInTheDocument()

    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should render desktop with a logo and no prompt", () => {
    render(<CommandBarNoSSR disableMobile={true} commandPromptOnly={true} />)
    expect(
      screen.getByRole("img", { name: "walcron-logo" })
    ).toBeInTheDocument()
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })
})
