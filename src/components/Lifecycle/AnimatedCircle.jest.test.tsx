import { spySearch } from "@/__tests__/mocks/locationMock"
import { render, screen } from "@testing-library/react"
import AnimatedCircle, { animeTailwindClass } from "./AnimatedCircle"
import "@/__tests__/mocks/windowMock"

describe("AnimatedCircle", () => {
  it("should render correctly", () => {
    render(<AnimatedCircle />)
    expect(screen.getByTitle("Deployment Lifecycle")).toHaveClass(
      animeTailwindClass,
    )
  })

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")

    render(<AnimatedCircle />)
    expect(screen.getByTitle("Deployment Lifecycle")).toHaveClass(
      "animate-none",
    )
  })
})
