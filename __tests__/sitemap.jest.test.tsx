import { render, screen, fireEvent } from "@testing-library/react"
import SiteMap from "@/pages/sitemap"

jest.mock("next/router", () => require("next-router-mock"))

describe("SiteMap", () => {
  const renderComponent = async () => {
    render(<SiteMap />)
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should render the page with right links", async () => {
    await renderComponent()
    expect(screen.getByText("HOME")).toHaveAttribute("href", "/")
    expect(screen.getByText("ABOUT US")).toHaveAttribute("href", "/about")
    expect(screen.getByText("HISTORY")).toHaveAttribute("href", "/history")
    expect(screen.getByText("PROJECTS")).toHaveAttribute("href", "/listing")
  })
})
