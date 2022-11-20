import { render, screen, fireEvent, within } from "@testing-library/react"
import History from "@/pages/history"
import { assertFooter } from "./utils/_footer"
import { assertMenu } from "./utils/_menu"

jest.mock("next/router", () => require("next-router-mock"))

describe("History", () => {
  const renderComponent = () => {
    render(<History />)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("Site's history"))
    expect(screen.getByText("Motivational books"))
  })

  it("should be able to scroll up", async () => {
    renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })

  it("should render the page with footer", async () => {
    renderComponent()
    assertFooter()
  })
})
