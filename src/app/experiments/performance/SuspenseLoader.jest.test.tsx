import SuspenseLoader from "./SuspenseLoader"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("SuspenseLoader", () => {
  const renderComponent = () => {
    render(<SuspenseLoader />)
  }

  it("should render Using React 18 Suspense", async () => {
    renderComponent()
    expect(await screen.findByText("Waiting Success")).toBeInTheDocument()
    expect(
      await screen.findByText("I am done", undefined, {
        timeout: 3000,
        interval: 200,
      })
    ).toBeInTheDocument()
    expect(await screen.findByText("Error: I failed")).toBeInTheDocument()
  })
})
