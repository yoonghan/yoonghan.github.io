import "../../__mocks__/routerMock"
import Amp, { config } from "@/pages/experiments/amp"
import { render, screen } from "@testing-library/react"

describe("Amp", () => {
  it("should render page correctly to inform we are in development phase", () => {
    render(<Amp />)
    expect(
      screen.getByText("Currently we are still in development phase for AMP.")
    ).toBeInTheDocument()
  })

  it("should expose config as true", () => {
    expect(config).toStrictEqual({ amp: true, runtime: "nodejs" })
  })
})
