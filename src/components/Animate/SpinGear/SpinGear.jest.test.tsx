import { render, screen } from "@testing-library/react"
import SpinGear from "."

describe("Animation SpinGear", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <SpinGear title={title} className={className}>
        <div>ArrowZoom Component</div>
      </SpinGear>
    )

  function assertSpin(isSpin: boolean) {
    const spinClassName = "fa-spin"
    if (isSpin) {
      expect(screen.getByRole("img", { hidden: true })).toHaveClass(
        spinClassName
      )
    } else {
      expect(screen.getByRole("img", { hidden: true })).not.toHaveClass(
        spinClassName
      )
    }
  }

  it("should render with optional className", () => {
    renderComponent("arrow-zoom", "class-1")
    expect(screen.getByTitle("arrow-zoom")).toHaveClass("class-1")
    assertSpin(true)
  })

  it("should be able to disable animation", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=none" },
      writable: true,
    })
    renderComponent("arrow-zoom-3")
    assertSpin(false)
  })
})
