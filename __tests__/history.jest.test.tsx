import { render, screen, fireEvent } from "@testing-library/react"
import History from "@/pages/history"
import userEvent from "@testing-library/user-event"
import { NextPageContext } from "next"
import { setCookie, deleteCookie } from "cookies-next"

jest.mock("next/router", () => require("next-router-mock"))

describe("History", () => {
  const renderComponent = async () => {
    render(<History />)
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should render the page with the important components", async () => {
    await renderComponent()
    expect(screen.getByText("Site's history"))
    expect(screen.getByText("Motivational books"))
  })

  it("should be able to scroll up", async () => {
    await renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })
})
