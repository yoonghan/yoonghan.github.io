import { render, screen } from "@testing-library/react"
import FontAwesomeAnimate from "."
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

describe("Animate FontAwesomeAnimate", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <FontAwesomeAnimate
        title={title}
        className={className}
        faIcon={faMagnifyingGlass}
      >
        <div>ArrowZoom Component</div>
      </FontAwesomeAnimate>
    )

  function assertBounce(isBouncing: boolean) {
    const spinClassName = "fa-bounce"
    if (isBouncing) {
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
    assertBounce(true)
  })

  it("should be able to disable animation", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=none" },
      writable: true,
    })
    renderComponent("arrow-zoom-3")
    assertBounce(false)
  })
})
