import { render, screen } from "@testing-library/react"
import Messenger from "./page"

describe("Messenger", () => {
  it("should show warning if none of the environment is set", () => {
    render(<Messenger />)
    expect(
      screen.getByText(
        "Pusher initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })
})
