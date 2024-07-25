import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React, { useRef, RefObject } from "react"
import ScrollIcon from "."

describe("ScrollIcon", () => {
  const Container = ({
    children,
  }: {
    children: (ref: RefObject<HTMLDivElement>) => React.ReactNode
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
      <div ref={containerRef} data-testid="parent-elem">
        {children(containerRef)}
      </div>
    )
  }

  it("should display component correctly", () => {
    render(
      <Container>{(ref) => <ScrollIcon scrollContainer={ref} />}</Container>
    )
    const scrollIcon = screen.getByTestId("scroll-icon")
    expect(scrollIcon).toHaveClass("scroll icon")
    // eslint-disable-next-line testing-library/no-node-access
    expect(scrollIcon.parentElement).toHaveClass("container")
    // eslint-disable-next-line testing-library/no-node-access
    expect(scrollIcon.parentElement).toHaveStyle({ opacity: 1 })
  })

  it("should display disappear as soon as scroll takes place", async () => {
    render(
      <Container>{(ref) => <ScrollIcon scrollContainer={ref} />}</Container>
    )
    const parent = screen.getByTestId("parent-elem")
    const scrollIcon = screen.getByTestId("scroll-icon")
    fireEvent.scroll(parent)
    await waitFor(
      () => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(scrollIcon.parentElement).not.toHaveStyle({ opacity: 1 })
      },
      { interval: 1000 }
    )
  })

  it("should be able to display a text in the scroll icon", () => {
    render(
      <Container>
        {(ref) => <ScrollIcon scrollContainer={ref} text={"Howdy"} />}
      </Container>
    )
    const scrollText = screen.getByText("Howdy")
    expect(scrollText).toBeInTheDocument()
    expect(scrollText).toHaveClass("scroll text")
  })
})
