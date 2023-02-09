import { render, screen, within } from "@testing-library/react"
import SiteMap from "@/pages/sitemap"
import { assertFooter } from "./utils/_footer"
import { assertMenu } from "./utils/_menu"
import { assertScrollToTop } from "./utils/_scrollToTop"

jest.mock("next/router", () => require("next-router-mock"))

describe("SiteMap", () => {
  const renderComponent = () => {
    render(<SiteMap />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render the page with right links", async () => {
    renderComponent()
    expect(screen.getByText("HOME")).toHaveAttribute("href", "/")
    expect(screen.getByText("ABOUT US")).toHaveAttribute("href", "/about")
    expect(screen.getByText("HISTORY")).toHaveAttribute("href", "/history")
    expect(screen.getByText("PROJECTS")).toHaveAttribute("href", "/projects")
    expect(screen.getByText("LESSONS")).toHaveAttribute(
      "href",
      "/projects/lessons"
    )
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })
})
