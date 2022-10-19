import { render, screen } from "@testing-library/react"
import Profiler from "."

describe("Profiler", () => {
  it("should render correctly", () => {
    render(
      <Profiler
        profiles={[
          {
            name: "name1",
            description: <div />,
            imgSrc: "/imgSrc1",
          },
          {
            name: "name2",
            description: <div />,
            imgSrc: "/imgSrc2",
          },
        ]}
      />
    )
    expect(screen.getByText("name1")).toBeInTheDocument()
    expect(screen.getByText("name2")).toBeInTheDocument()
  })
})
