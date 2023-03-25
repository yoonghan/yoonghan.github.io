import { render, screen } from "@testing-library/react"
import { usePathnameFn } from "../../../__mocks__/routerMock"
import "../../../__mocks__/routerMock"
import SubMenu from "."

describe("SubMenu", () => {
  it("should render nothing when there is no url", () => {
    usePathnameFn.mockReturnValue("")
    render(<SubMenu />)
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("should render nothing when there is not sub menu", () => {
    usePathnameFn.mockReturnValue("/about")
    render(<SubMenu />)
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("should render correctly when there are submenu elements", () => {
    usePathnameFn.mockReturnValue("/experiments")
    render(<SubMenu />)
    const ampPath = screen.getByText("Accelerated Mobile Pages")
    expect(ampPath).toBeInTheDocument()
    expect(ampPath).toHaveAttribute("href", "/experiments/amp")
  })

  it("should prevent sub menu to be linkable", () => {
    usePathnameFn.mockReturnValue("/experiments/amp")
    render(<SubMenu />)
    const ampPath = screen.getByText("Accelerated Mobile Pages")
    expect(ampPath).toBeInTheDocument()
    expect(ampPath).not.toHaveAttribute("href", "/experiments/amp")
  })
})
