import { render, screen } from "@testing-library/react"
import Messenger, { pusherAuthEndpoint } from "./page"

describe("Messenger", () => {
  it("should have the correct pusher endpoint", () => {
    expect(pusherAuthEndpoint).toBe("https://www.walcron.com/api/pusherauth")
  })

  it("should show warning if none of the environment is set", () => {
    render(<Messenger />)
    expect(
      screen.getByText(
        "Pusher initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })
})
