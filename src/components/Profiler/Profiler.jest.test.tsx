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
            width: 12,
            height: 13,
          },
          {
            name: "name3",
            description: <div />,
            imgSrc: "/imgSrc2",
            width: 12,
            height: 13,
          },
        ]}
      />
    )
    expect(screen.getByText("name1")).toBeInTheDocument()
    expect(screen.getByText("name2")).toBeInTheDocument()
    expect(screen.getByText("name3")).toBeInTheDocument()
  })
})
