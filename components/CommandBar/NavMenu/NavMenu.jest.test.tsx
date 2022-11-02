import singletonRouter from "next/router"
import { render, screen } from "@testing-library/react"
import NavMenu from "."
import userEvent from "@testing-library/user-event"

jest.mock("next/router", () => require("next-router-mock"))

describe("NavMenu", () => {
  it("should render nav menu", () => {
    singletonRouter.push("")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
  })

  it("should render nav menu with root", () => {
    singletonRouter.push("/")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
  })

  it("should render nav menu with menu", () => {
    singletonRouter.push("/about")
    render(<NavMenu />)
    expect(screen.getByText("home")).toBeInTheDocument()
    expect(screen.getByText("> about")).toBeInTheDocument()
  })

  it("should be able to go back when clicked", () => {
    singletonRouter.push("/")
    singletonRouter.push("/about")
    render(<NavMenu />)
    expect(singletonRouter.pathname).toBe("/about")
    expect(screen.getByText("home")).toHaveAttribute("href", "/")
  })
})
