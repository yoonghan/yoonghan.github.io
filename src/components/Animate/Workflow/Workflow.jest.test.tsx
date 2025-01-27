import { render, screen } from "@testing-library/react"
import Workflow from "."

describe("Animate Workflow", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <Workflow title={title} className={className}>
        <div>Workflow Component</div>
      </Workflow>
    )

  it("should render with optional className", () => {
    renderComponent("arrow-zoom", "class-1")
    expect(screen.getByTitle("arrow-zoom")).toHaveClass("class-1")
  })
})
