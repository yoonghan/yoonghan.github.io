import { render, screen } from "@testing-library/react"

import "@/__tests__/mocks/site"
import NotFound from "./not-found"

describe("not-found", () => {
  it("should render correctly", () => {
    render(<NotFound />)
    expect(screen.getByText("This page is not found")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Go back to home" })
    ).toHaveAttribute("href", "https://mockedUrl.com")
  })
})
