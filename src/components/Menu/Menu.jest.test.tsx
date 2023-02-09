import { sortedMenuPagesWithFilteredHomeAndSubMenu } from "@/config/pages"
import { render, screen } from "@testing-library/react"
import singletonRouter from "next/router"
import Menu from "."

jest.mock("next/router", () => require("next-router-mock"))

describe("Menu", () => {
  it("should load only top level testcase", () => {
    render(<Menu />)
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(screen.getByText("Projects")).toBeInTheDocument()
    expect(screen.getByText("About Us")).toBeInTheDocument()
    expect(screen.getByText("History")).toBeInTheDocument()
    expect(screen.getAllByText("|")).toHaveLength(
      sortedMenuPagesWithFilteredHomeAndSubMenu.length - 1
    )
  })

  it("should redirect to the right link, randomly picking project", () => {
    render(<Menu />)
    const projectLink = screen.getByText("Projects")
    expect(projectLink).toBeInTheDocument()
    expect(projectLink).toHaveAttribute("href", "/projects")
  })

  it("should show experiments submenus and current selected path is non attributed", () => {
    singletonRouter.push("/experiments")
    render(<Menu />)
    expect(screen.getByText("Accelerated Mobile Pages")).toBeInTheDocument()
    const experimentPath = screen.getByText("Experiments")
    expect(experimentPath).toBeInTheDocument()
    expect(experimentPath).not.toHaveAttribute("href", "/experiments")
  })
})
