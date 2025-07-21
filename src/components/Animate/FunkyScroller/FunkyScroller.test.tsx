import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import FunkyScroller from "."

describe("Funky Scroller", () => {
  const renderComponent = (title: string, className?: string) =>
    render(<FunkyScroller title={title} className={className} />)

  it("should render with optional className", () => {
    renderComponent("Funky-Scroller", "class-1")
    expect(screen.getByTitle("Funky-Scroller")).toHaveClass("class-1")
  })

  it("should reposition last element", async () => {
    jest.useFakeTimers()
    renderComponent("Funky-Scroller-2")
    jest.runAllTimers()
    fireEvent.scroll(window, { target: { scrollX: 100, scrollY: 200 } })
    jest.runAllTimers()

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTitle("Funky-Scroller-2").firstChild).toHaveStyle({
      width: "180px",
    })
  })

  it("should be able to disable animation", () => {
    spySearch.mockReturnValue("?animate=none")
    renderComponent("Funky-Scroller-1")
    expect(screen.getByTitle("Funky-Scroller-1")).toHaveClass("animate-none")
  })
})
