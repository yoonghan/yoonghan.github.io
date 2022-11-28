import Amp, { config } from "@/pages/amp"
import { render, screen, waitFor, within } from "@testing-library/react"

jest.mock("next/router", () => require("next-router-mock"))

describe("Amp", () => {
  it("should render page correctly to inform we are in development phase", () => {
    render(<Amp />)
    expect(
      screen.getByText("Currently we are still in development phase for AMP.")
    ).toBeInTheDocument()
  })

  it("should expose config as true", () => {
    expect(config).toStrictEqual({ amp: true })
  })
})
