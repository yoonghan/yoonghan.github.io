import { render, screen } from "@testing-library/react"
import Lifecycle from "."
import "@/__tests__/mocks/windowMock"

describe("Lifecyle", () => {
  it("should render error if model is not of 4", () => {
    render(<Lifecycle models={[]} />)
    expect(
      screen.getByText("Not Supported, must be EXACTLY 4 elements."),
    ).toBeInTheDocument()
  })

  describe("with data", () => {
    const renderData = () =>
      render(
        <Lifecycle
          models={[
            { url: "http://first-url", label: "first" },
            { url: "http://second-url", label: "second" },
            { url: "http://third-url", label: "third" },
            { url: "http://fourth-url", label: "fourth" },
          ]}
        />,
      )

    it("should render all the elements provided", () => {
      renderData()
      expect(screen.getByRole("link", { name: "first" })).toHaveAttribute(
        "href",
        "http://first-url",
      )
      expect(screen.getByRole("link", { name: "second" })).toHaveAttribute(
        "href",
      )
      expect(screen.getByRole("link", { name: "third" })).toHaveAttribute(
        "href",
      )
      expect(screen.getByRole("link", { name: "fourth" })).toHaveAttribute(
        "href",
        "http://fourth-url",
      )

      expect(screen.getByTitle("Deployment Lifecycle")).toBeInTheDocument()
    })
  })
})
