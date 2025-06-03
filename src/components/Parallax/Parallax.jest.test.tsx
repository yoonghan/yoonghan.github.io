import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import React, { RefObject, useRef } from "react"
import Parallax, { ScrollHandler } from "."

describe("Parallax", () => {
  const Main = ({
    children,
    scrollTo = jest.fn(),
  }: {
    children: (
      ref: RefObject<HTMLDivElement>,
      childRef: RefObject<ScrollHandler>,
    ) => React.ReactNode
    scrollTo?: (x: number, y: number) => void
  }) => {
    const tempRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<ScrollHandler>(null)

    return (
      <div ref={tempRef} data-testid={"scrollContainer"}>
        {children(tempRef, childRef)}
      </div>
    )
  }

  /* eslint-disable testing-library/no-node-access */
  it("should render correctly with multiple elements", () => {
    const scrollTo = jest.fn()
    render(
      <Main scrollTo={scrollTo}>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div>one</div>
            <div>two</div>
          </Parallax>
        )}
      </Main>,
    )
    expect(screen.getByText("one")).toBeInTheDocument()
    expect(screen.getByText("two")).toBeInTheDocument()
  })

  it("should render main container with scrolling properties", () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div>one</div>
            <div>one</div>
          </Parallax>
        )}
      </Main>,
    )
    expect(screen.getByTestId("scrollContainer")).toHaveStyle({
      overflowY: "scroll",
      height: "100vh",
    })
  })

  it("should render correctly height of parallax base on no# of child elements", () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div>one</div>
            <div>two</div>
            <div>three</div>
            <div>four</div>
          </Parallax>
        )}
      </Main>,
    )
    expect(screen.getByTestId("parallax-container")).toHaveStyle({
      height: "400vh",
    })
  })

  it("should dispatch on container scroll", async () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div data-testid="part-1">one</div>
            <div data-testid="part-2">two</div>
          </Parallax>
        )}
      </Main>,
    )

    window.innerHeight = 500
    window.dispatchEvent(new Event("resize"))
    fireEvent.scroll(screen.getByTestId("scrollContainer"), {
      target: { scrollTop: 250 },
    })
    await waitFor(() => {
      expect(screen.getByTestId("part-1").parentElement?.style.opacity).toBe(
        "1",
      )
    })
    await waitFor(() => {
      expect(screen.getByTestId("part-2").parentElement?.style.opacity).toBe(
        "0",
      )
    })
  })

  /* eslint-disable testing-library/no-node-access */
  it("should dispatch on window resizing", async () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div data-testid="part-1">one</div>
            <div data-testid="part-2">two</div>
          </Parallax>
        )}
      </Main>,
    )

    window.innerHeight = 500
    window.dispatchEvent(new Event("resize"))
    fireEvent.scroll(screen.getByTestId("scrollContainer"), {
      target: { scrollTop: 250 },
    })

    await waitFor(() => {
      expect(screen.getByTestId("part-1").parentElement?.style.opacity).toBe(
        "1",
      )
    })

    window.innerHeight = 1000
    window.dispatchEvent(new Event("resize"))
    fireEvent.scroll(screen.getByTestId("scrollContainer"), {
      target: { scrollTop: 250 },
    })
    expect(screen.getByTestId("part-1").parentElement?.style.opacity).toBe("1")
    expect(screen.getByTestId("part-2").parentElement?.style.opacity).toBe("0")
  })

  it("should not fail after element is unmounted", () => {
    expect.assertions(0)
    const { unmount } = render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div data-testid="part-1">one</div>
            <div data-testid="part-2">two</div>
          </Parallax>
        )}
      </Main>,
    )

    unmount()
    window.innerHeight = 1000
    window.dispatchEvent(new Event("resize"))
  })

  it("should be able to scroll based on window provided", async () => {
    const scrollTo = jest.fn()

    window.innerHeight = 500
    render(
      <Main scrollTo={scrollTo}>
        {(ref, subRef) => (
          <Parallax scrollContainer={ref} ref={subRef}>
            <div
              data-testid="part-1"
              onClick={() => subRef?.current?.scroll(1)}
              aria-hidden="true"
            >
              one
            </div>
            <div
              data-testid="part-2"
              onClick={() => subRef?.current?.scroll(0)}
              aria-hidden="true"
            >
              two
            </div>
          </Parallax>
        )}
      </Main>,
    )

    const parentElem = screen.getByTestId("scrollContainer")
    parentElem.scrollTo = scrollTo
    jest.spyOn(parentElem, "offsetHeight", "get").mockReturnValue(500)

    await UserEvent.click(screen.getByTestId("part-1"))
    expect(scrollTo).toHaveBeenCalledWith(0, 500)

    await UserEvent.click(screen.getByTestId("part-2"))
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
