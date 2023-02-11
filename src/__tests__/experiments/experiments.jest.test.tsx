import Experiment, { config } from "@/pages/experiments"
import { render, screen } from "@testing-library/react"
import { assertMenu } from "../utils/_menu"

jest.mock("next/router", () => require("next-router-mock"))

describe("Experiments", () => {
  it("should render page correctly to inform we are in development phase", async () => {
    render(<Experiment />)
    expect(
      screen.getByText("Currently we are still in development phase for AMP.")
    ).toBeInTheDocument()
  })

  it("should expose config as true", () => {
    expect(config).toStrictEqual({ amp: true, runtime: "nodejs" })
  })
})
