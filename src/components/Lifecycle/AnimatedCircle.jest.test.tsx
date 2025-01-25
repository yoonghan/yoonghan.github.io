import { render, screen } from "@testing-library/react"
import AnimatedCircle, { animeTailwindClass } from "./AnimatedCircle"
import "@/__tests__/mocks/windowMock"

describe("AnimatedCircle", () => {
  it("should render all the elements provided", () => {
    render(<AnimatedCircle />)
    expect(screen.getByTitle("Deployment Lifecycle")).toHaveClass(
      animeTailwindClass
    )
  })

  it("should be able to disable lifecycle animation", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=false" },
      writable: true,
    })

    render(<AnimatedCircle />)
    expect(screen.getByTitle("Deployment Lifecycle")).not.toHaveClass(
      animeTailwindClass
    )
  })
})
