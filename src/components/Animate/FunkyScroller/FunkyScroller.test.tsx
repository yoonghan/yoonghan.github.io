import { render, screen, within } from "@testing-library/react"
import FunkyScroller from "."

describe("Funky Scroller", () => {
  const renderComponent = (title: string, className?: string) =>
    render(<FunkyScroller title={title} className={className} />)

  it("should render with optional className", () => {
    renderComponent("Funky-Scroller", "class-1")
    expect(screen.getByTitle("Funky-Scroller")).toHaveClass("class-1")
  })

  it("should be able to disable animation", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=none" },
      writable: true,
    })
    renderComponent("Funky-Scroller-1")
    expect(screen.getByTitle("Funky-Scroller-1")).toHaveClass("animate-none")
  })
})
