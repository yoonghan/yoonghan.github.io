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

  const changeLabelValue = async (label: string, value: number) => {
    const inputElement = screen.getByLabelText(label)
    await userEvent.type(inputElement, `${value}`, {
      initialSelectionStart: 0,
      initialSelectionEnd: 2,
    })
    expect(inputElement).toHaveValue(value)
  }

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page with the important components", async () => {
    renderComponent()
    expect(screen.getByText("Snake Game"))
    await changeLabelValue("Snake Speed (sec/100):", 100)
    await changeLabelValue("Snake Size:", 2)
    await changeLabelValue("World Dimension:", 39) //as it's typed, so it's 3 > 2 then 39
    await changeLabelValue("Cell Size:", 15)
    // await userEvent.click(await screen.findByText("Play"))
    // await userEvent.keyboard("ArrowUp")
    // await userEvent.keyboard("ArrowDown")
    // await userEvent.keyboard("ArrowLeft")
    // await userEvent.keyboard("ArrowRight")
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })
})
