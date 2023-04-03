import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import "../../__mocks__/fetchMock"
import { fetchMock } from "../../__mocks__/fetchMock"
import GameSnake from "@/pages/projects/game-snake"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { readFileSync } from "fs"
import userEvent from "@testing-library/user-event"

// Read the .wasm file to memory
const file = readFileSync("./crate/pkg/snake_bg.wasm")
fetchMock.mockResolvedValue(file)

describe("Snake Game", () => {
  const renderComponent = () => {
    render(<GameSnake />)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page with the important components", async () => {
    renderComponent()
    expect(screen.getByText("Snake Game"))
    await userEvent.click(await screen.findByText("Play"))
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })
})
