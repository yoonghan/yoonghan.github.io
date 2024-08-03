import { render, screen } from "@testing-library/react"
import MicrofrontEnd from "./page"

describe("Microfrontend", () => {
  it("should show warning if none of the environment is set", () => {
    render(<MicrofrontEnd />)
    expect(
      screen.getByText(
        "Partially experimental but going forward, all written javascript projects are moved into Zelda."
      )
    ).toBeInTheDocument()
  })
})
