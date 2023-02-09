import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ScrollToTopWithNoSSR from "./ScrollToTopNoSSR"
import "../../__mocks__/windowMock"
import { spyOnScrollTo } from "../../__mocks__/windowMock"

describe("ScrollToTop", () => {
  it("should render scroller correctly", async () => {
    render(<ScrollToTopWithNoSSR />)
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    expect(screen.getByTestId("scroll-to-top")).toBeInTheDocument()

    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()

    const scrollToFn = spyOnScrollTo()
    await userEvent.click(screen.getByText("Up"))
    expect(scrollToFn).toHaveBeenCalledWith(0, 0)
  })

  it("should add 'dark' class for dark background", () => {
    render(<ScrollToTopWithNoSSR isLight={true} />)

    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toHaveClass("light")
  })
})
