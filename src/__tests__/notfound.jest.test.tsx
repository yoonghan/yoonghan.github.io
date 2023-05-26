import { render, screen } from "@testing-library/react"
import NotFound from "@/app/not-found"
import { assertFooter } from "./utils/_footer"

describe("not found page", () => {
  it("should render not found page", async () => {
    render(<NotFound />)
    assertFooter()
    expect(screen.getByText("404")).toBeDefined()
    expect(screen.getByText("This page is not found")).toBeDefined()

    //link to root has issue with NEXT
    expect(
      screen.getByRole("button", { name: "Go back to home" })
    ).toHaveAttribute("href", "https://www.walcron.com")
  })
})
