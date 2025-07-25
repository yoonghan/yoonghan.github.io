import { render, screen, within } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import Workflow from "."

describe("Animate Workflow", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <Workflow title={title} className={className}>
        <div>Workflow Component</div>
      </Workflow>,
    )

  it("should render with optional className", () => {
    renderComponent("workflow", "class-1")
    expect(screen.getByTitle("workflow")).toHaveClass("class-1")
  })

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")
    renderComponent("workflow-1")
    expect(
      within(screen.getByTitle("workflow-1")).getByTestId("workflow"),
    ).toHaveClass("animate-none")
  })
})
