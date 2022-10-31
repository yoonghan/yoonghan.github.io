import { render, screen, fireEvent } from "@testing-library/react"
import React, { RefObject, useRef } from "react"
import Parallax from "."

describe("Parallax", () => {
  const Main = ({
    children,
  }: {
    children: (ref: RefObject<HTMLDivElement>) => React.ReactNode
  }) => {
    const tempRef = useRef<HTMLDivElement>(null)

    return (
      <div ref={tempRef} data-testid={"scrollContainer"}>
        {children(tempRef)}
      </div>
    )
  }

  /* eslint-disable testing-library/no-node-access */
  it("should render correctly with multiple elements", () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div>one</div>
            <div>two</div>
          </Parallax>
        )}
      </Main>
    )
    expect(screen.getByText("one")).toBeInTheDocument()
    expect(screen.getByText("two")).toBeInTheDocument()
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
      </Main>
    )
    expect(screen.getByTestId("parallax-container")).toHaveStyle({
      height: "400vh",
    })
  })

  it("should dispatch on container scroll", () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div data-testid="part-1">one</div>
            <div data-testid="part-2">two</div>
          </Parallax>
        )}
      </Main>
    )

    window.innerHeight = 500
    window.dispatchEvent(new Event("resize"))
    fireEvent.scroll(screen.getByTestId("scrollContainer"), {
      target: { scrollTop: 250 },
    })
    expect(screen.getByTestId("part-1").parentElement?.style.opacity).toBe("1")
    expect(screen.getByTestId("part-2").parentElement?.style.opacity).toBe("0")
  })

  /* eslint-disable testing-library/no-node-access */
  it("should dispatch on window resizing", () => {
    render(
      <Main>
        {(ref) => (
          <Parallax scrollContainer={ref}>
            <div data-testid="part-1">one</div>
            <div data-testid="part-2">two</div>
          </Parallax>
        )}
      </Main>
    )

    window.innerHeight = 500
    window.dispatchEvent(new Event("resize"))
    fireEvent.scroll(screen.getByTestId("scrollContainer"), {
      target: { scrollTop: 250 },
    })
    expect(screen.getByTestId("part-1").parentElement?.style.opacity).toBe("1")

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
      </Main>
    )

    unmount()
    window.innerHeight = 1000
    window.dispatchEvent(new Event("resize"))
  })
})
