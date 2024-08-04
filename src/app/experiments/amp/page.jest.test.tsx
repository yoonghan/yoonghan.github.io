import Amp from "./page"
import { render, screen } from "@testing-library/react"

describe("Amp", () => {
  it("should render page correctly to inform we are in development phase", () => {
    render(<Amp />)
    expect(
      screen.getByText(
        "PAGE IS BROKEN, not planning to support it anymore. It is so broken that fixing is not worthwhile!!!"
      )
    ).toBeInTheDocument()
  })
})
