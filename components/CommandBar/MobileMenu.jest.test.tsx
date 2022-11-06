import singletonRouter from "next/router"
import { render, screen } from "@testing-library/react"
import MobileMenu from "./MobileMenu"

jest.mock("next/router", () => require("next-router-mock"))

describe("MobileMenu", () => {
  it("should render menu correctly", () => {
    render(<MobileMenu />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("History")).toBeInTheDocument()
    //TODO: Next version
    // expect(screen.getByText("Showcase")).toBeInTheDocument()
  })

  it("should be active if it's the route is the selected item", () => {
    singletonRouter.push("/about")
    render(<MobileMenu />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("About").parentElement).toHaveClass("is-active")
  })
})
