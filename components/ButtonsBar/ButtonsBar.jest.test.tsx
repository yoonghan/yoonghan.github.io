import { render, screen } from "@testing-library/react"
import ButtonsBar from "."

describe("ButtonsBar", () => {

  it("should display button bar", () => {
    render(
      <ButtonsBar
        menuTexts={[
          {
            title: "sample",
            link: "/",
          },
          {
            title: "two",
            link: "/two",
          },
          {
            title: "three",
            link: "/three",
          },
        ]}
      />
    )
    expect(screen.getByText("sample")).toHaveAttribute("href", "/")
    expect(screen.getByText("two")).toHaveAttribute("href", "/two")
    expect(screen.getByText("three")).toHaveAttribute("href", "/three")
  })

  it("should display button bar with active", () => {
    render(
      <ButtonsBar
        menuTexts={[
          {
            title: "one",
            link: "/",
          },
          {
            title: "two",
            link: "/two",
          },
          {
            title: "three",
            link: "/three",
          },
        ]}
        activeIndex={1}
      />
    )
    const activeText = screen.getByText("two")
    expect(activeText).toHaveAttribute("href", "/two")
    // eslint-disable-next-line testing-library/no-node-access
    expect(activeText.parentElement).toHaveClass("is-active")
    expect(screen.getByText("one")).not.toHaveClass("is-active")
  })

  it("should render if button bar !==3 but with exception", async () => {
    render(
      <ButtonsBar
        menuTexts={[
          {
            title: "only 1",
            link: "/",
          },
        ]}
      />
    )
    expect(screen.getByText("only 1")).toBeInTheDocument()
  })
})
