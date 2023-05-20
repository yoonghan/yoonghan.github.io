import { render, screen } from "@testing-library/react"
import SiteMap from "@/app/sitemap/page"
import { assertScrollToTop } from "./utils/_scrollToTop"

describe("SiteMap", () => {
  const renderComponent = () => {
    render(<SiteMap />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
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
})
