import { render, screen, fireEvent } from "@testing-library/react"
import About from "@/pages/about"
import userEvent from "@testing-library/user-event"
import { NextPageContext } from "next"
import { setCookie, deleteCookie } from "cookies-next"

jest.mock("next/router", () => require("next-router-mock"))

describe("About", () => {
  const renderComponent = async () => {
    render(<About />)
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
  }

  it("should render the page with the important components", async () => {
    await renderComponent()
    expect(screen.getByText("About our mission"))
    expect(screen.getByText("The developers"))
    expect(
      screen.getAllByText(
        "If you are interested to talk to us, leave us your contact. Let us reach you instead."
      )
    )
  })

  it("should be able to scroll up", async () => {
    await renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })
})