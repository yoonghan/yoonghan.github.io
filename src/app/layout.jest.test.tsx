import { render, screen } from "@testing-library/react"
import "../__mocks__/routerMock"
import { Body } from "./layout"
import { assertMenu } from "@/__tests__/utils/_menu"

describe("Main Layout", () => {
  const renderComponent = () => {
    render(
      <Body>
        <>Sample</>
      </Body>
    )
  }

  it("should have a Mega Menu", async () => {
    renderComponent()
    await assertMenu()
    expect(screen.getByText("Sample")).toBeInTheDocument()
  })
})
