import { render, screen } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import FontAwesomeAnimate, { SupportedAnimation } from "."
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

describe("FontAwesomeAnimate", () => {
  const renderComponent = (
    title: string,
    className?: string,
    animate: SupportedAnimation = "bounce",
  ) =>
    render(
      <FontAwesomeAnimate
        title={title}
        className={className}
        faIcon={faMagnifyingGlass}
        animate={animate}
      >
        <div>ArrowZoom Component</div>
      </FontAwesomeAnimate>,
    )

  function assertAnimate(isAnimated: boolean, animate: SupportedAnimation) {
    const spinClassName = "fa-" + animate
    if (isAnimated) {
      expect(screen.getByRole("img", { hidden: true })).toHaveClass(
        spinClassName,
      )
    } else {
      expect(screen.getByRole("img", { hidden: true })).not.toHaveClass(
        spinClassName,
      )
    }
  }

  it("should render with optional className", () => {
    renderComponent("arrow-zoom", "class-1")
    expect(screen.getByTitle("arrow-zoom")).toHaveClass("class-1")
    assertAnimate(true, "bounce")
  })

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")
    renderComponent("arrow-zoom-3")
    assertAnimate(false, "bounce")
  })
})
