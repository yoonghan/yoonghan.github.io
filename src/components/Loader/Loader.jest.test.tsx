import { render, screen, waitFor } from "@testing-library/react"
import Loader from "."

describe("Loader", () => {
  it("should have a test id", async () => {
    render(<Loader />)
    expect(screen.getByTestId("walcron_loader")).toBeInTheDocument()
  })

  it("should change opacity and diameter overtime", async () => {
    render(<Loader />)
    const loader = screen.getByTestId("walcron_loader")
    expect(loader).toHaveStyle({ opacity: 0, width: 0 })
    await waitFor(
      () => {
        expect(loader).not.toHaveStyle({ opacity: 0, width: "100px" })
      },
      { timeout: 100 }
    )
  })
})
