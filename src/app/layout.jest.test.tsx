import { render, screen, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import { Body } from "./layout"
import userEvent from "@testing-library/user-event"

describe("Main Layout", () => {
  const renderComponent = () => {
    render(
      <Body>
        <>Sample</>
      </Body>
    )
  }

  const assertFooter = () => {
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).getByText("Walcron 2014-2024 ©")).toBeInTheDocument()
  }

  const assertMenu = async () => {
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(await screen.findAllByText("walcron$")).toHaveLength(2)
  }

  it("should have a Mega Menu", async () => {
    renderComponent()
    await assertMenu()
    assertFooter()
    expect(screen.getByText("Sample")).toBeInTheDocument()
  })

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
})
