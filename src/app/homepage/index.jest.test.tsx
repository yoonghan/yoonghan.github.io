import { render, screen, waitFor, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import HomePage from "."
import userEvent from "@testing-library/user-event"

describe("HomePage", () => {
  const renderComponent = () => {
    render(<HomePage />)
  }

  it("should be able to load and accept cookie", async () => {
    const cookieText = "This site uses cookies."

    renderComponent()
    const cookieSection = await screen.findByTestId("cookie-dialog")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    await userEvent.click(
      within(cookieSection).getByRole("button", { name: "Accept" })
    )
    expect(
      within(cookieSection).queryByText(cookieText)
    ).not.toBeInTheDocument()
  })

  it("should have a social fab loaded", async () => {
    renderComponent()
    expect(await screen.findByRole("link", { name: "git" })).toBeInTheDocument()
  })
})
