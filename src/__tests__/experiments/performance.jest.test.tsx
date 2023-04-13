import Performance from "@/pages/experiments/performance"
import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import userEvent from "@testing-library/user-event"
import { assertMenu } from "../utils/_menu"

describe("Performance", () => {
  const renderComponent = () => {
    render(<Performance />)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

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
