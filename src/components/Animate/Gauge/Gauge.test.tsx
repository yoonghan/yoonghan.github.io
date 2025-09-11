import { render, screen, within } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import Gauge from "."

describe("Animate Gauge", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <Gauge title={title} className={className}>
        <div>Gauge Component</div>
      </Gauge>,
    )

  it("should render with optional className", () => {
    renderComponent("Gauge", "class-1")
    expect(screen.getByTitle("Gauge")).toHaveClass("class-1")
  })

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")
    renderComponent("workflow-1")
    expect(
      within(screen.getByTitle("workflow-1")).getByTestId("gauge"),
    ).toHaveClass("animate-none")
    spySearch.mockClear()
  })
})
