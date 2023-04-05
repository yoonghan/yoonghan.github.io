import { render, screen } from "@testing-library/react"
import { clearBoard, drawCell, drawSquareBoard } from "./drawCanvas"
import * as canvasMock from "jest-canvas-mock"

describe("drawCanvas", () => {
  const getCanvasTestId = "canvas-test"

  const renderComponent = () => {
    render(<canvas data-testid={getCanvasTestId} />)
  }

  it("should draw a squared board", () => {
    renderComponent()
    const canvas = screen.getByTestId(getCanvasTestId) as HTMLCanvasElement
    const ctx = canvas.getContext("2d")!!
    drawSquareBoard(ctx, 5, 5)
    const calls = ctx.__getDrawCalls()
    expect(calls).toMatchSnapshot()
  })

  it("should draw a cell", () => {
    renderComponent()
    const canvas = screen.getByTestId(getCanvasTestId) as HTMLCanvasElement
    const ctx = canvas.getContext("2d")!!
    drawCell(ctx, 0, 10, 5, "green")
    const calls = ctx.__getDrawCalls()
    expect(calls).toMatchSnapshot()
  })

  it("should be able to clear", () => {
    renderComponent()
    const canvas = screen.getByTestId(getCanvasTestId) as HTMLCanvasElement
    const ctx = canvas.getContext("2d")!!
    drawCell(ctx, 0, 10, 5, "green")
    clearBoard(ctx, canvas)
    const calls = ctx.__getDrawCalls()
    expect(calls).toMatchSnapshot()
  })
})
