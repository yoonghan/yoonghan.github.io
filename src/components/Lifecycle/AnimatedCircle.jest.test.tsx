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
    Object.defineProperty(window, "location", {
      value: { search: "?animate=none" },
      writable: true,
    })

    render(<AnimatedCircle />)
    expect(screen.getByTitle("Deployment Lifecycle")).toHaveClass(
      "animate-none",
    )
  })
})
