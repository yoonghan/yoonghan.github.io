import { render, screen } from "@testing-library/react"
import "../__mocks__/routerMock"
import { Body } from "./layout"
import { assertMenu } from "@/__tests__/utils/_menu"
import { assertFooter } from "@/__tests__/utils/_footer"

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
    await assertFooter()
    expect(screen.getByText("Sample")).toBeInTheDocument()
  })
})
