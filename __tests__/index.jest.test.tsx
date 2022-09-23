import { render, screen, waitFor, within } from "@testing-library/react"
import Home from "@/pages/index"
import userEvent from "@testing-library/user-event"

describe("Home", () => {
  it("should render a construction site", () => {
    render(<Home termsRead="false" />)
    expect(
      screen.getByText("Currently we are under-construction")
    ).toBeInTheDocument()
  })

  it("should be able to click on the cookie button", async () => {
    const cookieText = "This site uses cookies."

    render(<Home termsRead="false" />)
    const cookieSection = screen.getByRole("cookie")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    userEvent.click(
      within(cookieSection).getByRole("button", { name: "Close" })
    )
    await waitFor(() => {
      expect(
        within(cookieSection).queryByText(cookieText)
      ).not.toBeInTheDocument()
    })
  })
})
