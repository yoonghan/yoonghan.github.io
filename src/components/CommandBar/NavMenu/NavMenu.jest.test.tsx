import { render, screen } from "@testing-library/react"
import { usePathnameFn } from "@/__tests__/mocks/routerMock"
import "@/__tests__/mocks/routerMock"
import NavMenu from "."

describe("NavMenu", () => {
  it("should render nav menu", () => {
    usePathnameFn.mockReturnValue("")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
  })

  it("should render nav menu with root", () => {
    usePathnameFn.mockReturnValue("/")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
  })

  it("should render nav menu with menu", () => {
    usePathnameFn.mockReturnValue("/about")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
    expect(screen.getByText("> about")).toBeInTheDocument()
  })

  it("should be able to go back when clicked", () => {
    usePathnameFn.mockReturnValue("/about")
    render(<NavMenu />)
    expect(screen.getByText("home")).toHaveAttribute("href", "/")
  })

  it("should contain a navigation with Site Map named", () => {
    render(<NavMenu />)
    expect(
      screen.getByRole("navigation", { name: "Site Map" }),
    ).toBeInTheDocument()
  })
})
