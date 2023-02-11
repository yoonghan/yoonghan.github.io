import { sortedMenuPagesWithFilteredHomeAndSubMenu } from "@/config/pages"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import singletonRouter from "next/router"
import Menu from "."

jest.mock("next/router", () => require("next-router-mock"))

describe("Menu", () => {
  const waitForCommandBar = async () => {
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should load only top level testcase", async () => {
    render(<Menu />)
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(screen.getByText("Projects")).toBeInTheDocument()
    expect(screen.getByText("About Us")).toBeInTheDocument()
    expect(screen.getByText("History")).toBeInTheDocument()
    expect(screen.getAllByText("|")).toHaveLength(
      sortedMenuPagesWithFilteredHomeAndSubMenu.length - 1
    )
    await waitForCommandBar()
  })

  it("should redirect to the right link, randomly picking project", async () => {
    render(<Menu />)
    const projectLink = screen.getByText("Projects")
    expect(projectLink).toHaveAttribute("href", "/projects")
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
    await waitForCommandBar()
  })

  it("should show experiments submenus and current selected path is non attributed", async () => {
    singletonRouter.push("/experiments")
    render(<Menu />)
    expect(screen.getByText("Accelerated Mobile Pages")).toBeInTheDocument()
    const experimentPath = screen.getByText("Experiments")
    expect(experimentPath).not.toHaveAttribute("href", "/experiments")
    await waitForCommandBar()
  })

  it("should change when toggle with right, left pointer", async () => {
    render(<Menu />)
    const leftArrow = "〈"
    expect(screen.getByText("Projects")).toBeInTheDocument()
    await userEvent.click(screen.getByText(leftArrow))
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
    await userEvent.click(screen.getByText(leftArrow))
    expect(await screen.findByText("Projects")).toBeInTheDocument()
    await waitForCommandBar()
  })
})
