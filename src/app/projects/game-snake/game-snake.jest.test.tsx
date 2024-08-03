import { render, screen } from "@testing-library/react"
import "@/__tests__/mocks/snakeWasmMock"
import GameSnake from "./page"
import userEvent from "@testing-library/user-event"
import random from "@/util/random"

describe("Snake Game", () => {
  const renderComponent = () => {
    render(<GameSnake />)
  }

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
    await userEvent.type(screen.getByLabelText("Snake Size:"), "4", {
      initialSelectionStart: 1,
      initialSelectionEnd: 2,
    })
    expect(screen.getByLabelText("Snake Size:")).toHaveValue(14)
  })

  it("should randomize once board dimension is changed", async () => {
    const mockRandom = jest.fn()
    const spyOnRandom = jest.spyOn(random, "rnd")
    spyOnRandom.mockImplementation(mockRandom)
    mockRandom.mockReturnValue(1)
    renderComponent()
    expect(mockRandom).toHaveBeenCalled()
    expect(screen.getByText("Snake Game")).toBeInTheDocument()
    expect(
      await screen.findByRole("button", { name: "Play" })
    ).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText("World Dimension:"), "2", {
      initialSelectionStart: 1,
      initialSelectionEnd: 2,
    })
    expect(screen.getByLabelText("World Dimension:")).toHaveValue(12)
    expect(mockRandom).toBeCalledTimes(3)
  })
})
