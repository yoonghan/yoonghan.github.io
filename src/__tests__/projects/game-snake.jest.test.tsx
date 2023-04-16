import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import "../../__mocks__/snakeWasmMock"
import GameSnake, { config } from "@/pages/projects/game-snake"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import userEvent from "@testing-library/user-event"

describe("Snake Game", () => {
  const renderComponent = () => {
    render(<GameSnake />)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page and user can play", async () => {
    renderComponent()
    expect(screen.getByText("Snake Game")).toBeInTheDocument()
    expect(
      await screen.findByRole("button", { name: "Play" })
    ).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Play" }))
    expect(screen.getByLabelText("World Dimension:")).toBeDisabled()
  })

  it("should be able to change form settings", async () => {
    renderComponent()
    expect(screen.getByText("Snake Game")).toBeInTheDocument()
    expect(
      await screen.findByRole("button", { name: "Play" })
    ).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText("Snake Size:"), "{backspace}2")
    expect(screen.getByLabelText("Snake Size:")).toHaveValue(12)
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })

  it("should expose config with runtime set to nodejs as edge will not work", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })
})
