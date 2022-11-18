import { render, screen, fireEvent } from "@testing-library/react"
import Projects from "@/pages/projects"

jest.mock("next/router", () => require("next-router-mock"))

describe("Projects", () => {
  const renderComponent = async () => {
    render(<Projects />)
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should render the page with the important components", async () => {
    await renderComponent()
    expect(screen.getByText("Playground projects"))
  })

  it("should be able to scroll up", async () => {
    await renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })
})
