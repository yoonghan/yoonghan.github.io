import "./mocks/navigationNext-no-animate"
import { render, screen } from "@testing-library/react"
import Lifecycle from "."
import "@/__tests__/mocks/windowMock"
import { animeTailwindClass } from "./const"

describe("Lifecyle", () => {
  it("should be able to disable lifecycle animation", () => {
    render(
      <Lifecycle
        models={[
          { url: "http://first-url", label: "first" },
          { url: "http://second-url", label: "second" },
          { url: "http://third-url", label: "third" },
          { url: "http://fourth-url", label: "fourth" },
        ]}
      />
    )

    expect(screen.getByTestId("lifecycle-animate")).not.toHaveClass(
      animeTailwindClass
    )
  })
})
