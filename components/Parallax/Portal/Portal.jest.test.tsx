import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Portal from "."

describe("Portal", () => {
  it("should render portal correctly", () => {
    render(<Portal onClose={() => {}} />)
    expect(screen.getByText("(Tap anywhere to close this message)"))
  })

  it("should be able to close anywhere", async () => {
    const closeFn = jest.fn()
    render(<Portal onClose={closeFn} />)
    await userEvent.click(screen.getByRole("modal"))
    expect(closeFn).toBeCalled()
  })
})
