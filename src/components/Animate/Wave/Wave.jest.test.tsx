import { render, screen } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import Wave from "."

describe("Wave", () => {
  const renderComponent = (title: string, className?: string) =>
    render(
      <Wave title={title} className={className}>
        <>Wave Component</>
      </Wave>,
    )

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")
    renderComponent("waves-1")
    screen
      .getByTitle("waves-1")
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll("div")
      .forEach((elem) => {
        expect(elem.className).toContain(" animate-none")
      })
  })

  it("should render with optional className", () => {
    renderComponent("waves-2", "class-1")

    expect(screen.getByTitle("waves-2")).toHaveClass("relative")
    expect(screen.getByTitle("waves-2")).toHaveClass("class-1")
  })
})
