import { render, screen, within } from "@testing-library/react"
import Lessons from "@/pages/projects/lessons"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { assertScrollToTop } from "../utils/_scrollToTop"

jest.mock("next/router", () => require("next-router-mock"))

describe("Lessons", () => {
  const renderComponent = () => {
    render(<Lessons />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render the page with footer", async () => {
    await renderComponent()
    assertFooter()
  })
})
