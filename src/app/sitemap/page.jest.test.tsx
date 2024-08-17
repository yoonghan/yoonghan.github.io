import { render, screen } from "@testing-library/react"
import SiteMap, { metadata } from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

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
    expect(screen.getByText("Home")).toHaveAttribute("href", "/")
    expect(screen.getByText("About Us")).toHaveAttribute("href", "/about")
    expect(screen.getByText("History")).toHaveAttribute("href", "/history")
    expect(screen.getByText("Projects")).toHaveAttribute("href", "/projects")
    expect(screen.getByText("Lessons")).toHaveAttribute(
      "href",
      "/projects/lessons"
    )
  })

  it("should have the right metadata defined", () => {
    expect(metadata).toStrictEqual({
      title: "Sitemap",
      description: "Website links and site.",
    })
  })
})
