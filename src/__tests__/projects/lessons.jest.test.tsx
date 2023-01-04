import { render, screen, within } from "@testing-library/react"
import Lessons from "@/pages/projects/lessons"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"

jest.mock("next/router", () => require("next-router-mock"))

describe("Lessons", () => {
  const renderComponent = () => {
    render(<Lessons />)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page with footer", async () => {
    await renderComponent()
    assertFooter()
  })
})
