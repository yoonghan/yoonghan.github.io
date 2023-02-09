import { render, screen } from "@testing-library/react"
import singletonRouter from "next/router"
import SubMenu from "."

jest.mock("next/router", () => require("next-router-mock"))

describe("SubMenu", () => {
  it("should render nothing when there is no url", () => {
    singletonRouter.push("")
    render(<SubMenu />)
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("should render nothing when there is not sub menu", () => {
    singletonRouter.push("/about")
    render(<SubMenu />)
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("should render correctly when there are submenu elements", () => {
    singletonRouter.push("/experiments")
    render(<SubMenu />)
    const ampPath = screen.getByText("Accelerated Mobile Pages")
    expect(ampPath).toBeInTheDocument()
    expect(ampPath).toHaveAttribute("href", "/experiments/amp")
  })

  it("should prevent sub menu to be linkable", () => {
    singletonRouter.push("/experiments/amp")
    render(<SubMenu />)
    const ampPath = screen.getByText("Accelerated Mobile Pages")
    expect(ampPath).toBeInTheDocument()
    expect(ampPath).not.toHaveAttribute("href", "/experiments/amp")
  })
})
