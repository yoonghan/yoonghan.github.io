import { render, screen, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import { Body } from "./layout"

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
    expect(await screen.findAllByText("walcron@tm$")).toHaveLength(2)
  }

  it("should have a Mega Menu", async () => {
    renderComponent()
    await assertMenu()
    await assertFooter()
    expect(screen.getByText("Sample")).toBeInTheDocument()
  })
})
