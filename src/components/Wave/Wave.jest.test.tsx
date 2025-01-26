import { render, screen } from "@testing-library/react"
import Wave from "."

describe("Wave", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <Wave title={title} className={className}>
        <div>Wave Component</div>
      </Wave>
    )

  it("should render correctly", () => {
    renderComponent("waves")

    expect(screen.getByText("Wave Component")).toBeInTheDocument()
    expect(screen.getByTitle("waves")).toHaveClass("container")
  })

  it("should be able to disable animation", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=false" },
      writable: true,
    })
    renderComponent("waves-1")
    expect(screen.getByTitle("waves-1")).toHaveClass("stop")
  })

  it("should render with optional className", () => {
    renderComponent("waves-2", "class-1")

    expect(screen.getByTitle("waves-2")).toHaveClass("class-1")
  })
})
