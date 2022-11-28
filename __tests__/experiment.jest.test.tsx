import Experiment, { config } from "@/pages/experiments"
import { render, screen, waitFor, within } from "@testing-library/react"

jest.mock("next/router", () => require("next-router-mock"))

describe("Experiment", () => {
  it("should render page correctly to inform we are in development phase", () => {
    render(<Experiment />)
    expect(
      screen.getByText("Currently we are still in development phase for AMP.")
    ).toBeInTheDocument()
  })

  it("should expose config as true", () => {
    expect(config).toStrictEqual({ amp: true, runtime: "nodejs" })
  })
})
