import { fireEvent, render, screen } from "@testing-library/react"
import ScrollableList from "."

describe("ScrollableList", () => {
  const renderComponent = () => {
    render(
      <ScrollableList
        listItems={[
          { id: "1", content: <>1</> },
          { id: "2", content: <>2</> },
          { id: "3", content: <>3</> },
          { id: "4", content: <>4</> },
          { id: "5", content: <>5</> },
          { id: "6", content: <>6</> },
        ]}
        maxItemsToRender={2}
      />,
    )
  }

  it("should be able to render first 2 components only", () => {
    renderComponent()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.queryByText("3")).not.toBeInTheDocument()
  })

  it("should be able to render next components after scroll", async () => {
    renderComponent()
    const scrollableList = screen.getByTestId("scrollable-list")
    fireEvent.scroll(scrollableList, { target: { scrollTop: 200 } })
    expect(await screen.findByText("5")).toBeInTheDocument()
    expect(await screen.findByText("6")).toBeInTheDocument()
    expect(screen.queryByText("1")).not.toBeInTheDocument()
    expect(screen.queryByText("2")).not.toBeInTheDocument()
  })

  it("should be able to render center component given height per item is 30", async () => {
    renderComponent()
    const scrollableList = screen.getByTestId("scrollable-list")
    fireEvent.scroll(scrollableList, { target: { scrollTop: 61 } })
    expect(await screen.findByText("3")).toBeInTheDocument()
    expect(await screen.findByText("4")).toBeInTheDocument()
    expect(screen.queryByText("5")).not.toBeInTheDocument()
    expect(screen.queryByText("6")).not.toBeInTheDocument()
  })
})
