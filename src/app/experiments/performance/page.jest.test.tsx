import Performance from "./page"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Performance", () => {
  const renderComponent = () => {
    render(<Performance />)
  }

  /** Removed from test due to slowness and already test proven in snake game */
  xit("should render Using React 18 Suspense", async () => {
    renderComponent()
    expect(screen.getByText("Using React 18 Suspense")).toBeInTheDocument()
    await userEvent.click(
      screen.getByRole("button", { name: "Toggle Suspense Display" })
    )
    expect(await screen.findByText("Waiting Success")).toBeInTheDocument()
    expect(
      await screen.findByText("I am done", undefined, {
        timeout: 3000,
        interval: 1000,
      })
    ).toBeInTheDocument()
    expect(await screen.findByText("I failed")).toBeInTheDocument()
  })
})
