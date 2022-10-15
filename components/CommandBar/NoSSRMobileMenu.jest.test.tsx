import singletonRouter from "next/router"
import { render, screen } from "@testing-library/react"
import NoSSRMobileMenu from "./NoSSRMobileMenu"

jest.mock("next/router", () => require("next-router-mock"))

describe("NoSSRMobileMenu", () => {
  it("should render menu correctly", () => {
    render(<NoSSRMobileMenu />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Showcase")).toBeInTheDocument()
  })

  it("should be active if it's the route is the selected item", () => {
    singletonRouter.push("/about")
    render(<NoSSRMobileMenu />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("About").parentElement).toHaveClass("is-active")
  })
})
