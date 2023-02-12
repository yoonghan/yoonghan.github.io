import ClarenceBday, { config } from "@/pages/clarencebday"
import { render, screen, fireEvent } from "@testing-library/react"

describe("Clarence Birthday page", () => {
  it("should render as clarence bday page", () => {
    render(<ClarenceBday />)
    expect(screen.getByText("Welcome To Clarence Birthday")).toBeInTheDocument()
  })

  it("should expose config with runtime set to nodejs as edge will not work", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })
})
