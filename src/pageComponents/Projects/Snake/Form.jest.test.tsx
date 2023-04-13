import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Form from "./Form"

describe("Form", () => {
  const renderComponent = ({
    disabled = false,
    onUpdate = jest.fn(),
    formValues = {
      snakeSpeed: 10,
      worldDimension: 11,
      snakeSize: 3,
      cellSize: 12,
    },
  }: {
    disabled?: boolean
    onUpdate?: (info: { id: string; value: number }) => void
    formValues?: {
      snakeSpeed: number
      worldDimension: number
      snakeSize: number
      cellSize: number | string
    }
  }) => {
    render(
      <Form disabled={disabled} onUpdate={onUpdate} formValues={formValues} />
    )
  }

  it("should render form with right values", () => {
    renderComponent({
      formValues: {
        snakeSpeed: 10,
        worldDimension: 9,
        snakeSize: 8,
        cellSize: 7,
      },
    })
    expect(screen.getByLabelText("Snake Speed (sec/100):")).toHaveValue(10)
    expect(screen.getByLabelText("World Dimension:")).toHaveValue(9)
    expect(screen.getByLabelText("Snake Size:")).toHaveValue(8)
    expect(screen.getByLabelText("Cell Size:")).toHaveValue(7)
  })

  it("should allow form to change values", async () => {
    const mockUpdate = jest.fn()
    renderComponent({
      onUpdate: mockUpdate,
      formValues: {
        snakeSpeed: 0,
        worldDimension: 4,
        snakeSize: 0,
        cellSize: 0,
      },
    })

    await userEvent.type(screen.getByLabelText("Snake Speed (sec/100):"), "1")
    expect(mockUpdate).toHaveBeenLastCalledWith({ id: "snakeSpeed", value: 1 })
    await userEvent.type(screen.getByLabelText("World Dimension:"), "4")
    expect(mockUpdate).toHaveBeenLastCalledWith({
      id: "worldDimension",
      value: 44,
    })
    await userEvent.type(screen.getByLabelText("Snake Size:"), "2")
    expect(mockUpdate).toHaveBeenLastCalledWith({ id: "snakeSize", value: 2 })
    await userEvent.type(screen.getByLabelText("Cell Size:"), "3")
    expect(mockUpdate).toHaveBeenLastCalledWith({ id: "cellSize", value: 3 })
  })

  it("should show error if the limit is above 100 and Error should disappear when fixed", async () => {
    const mockUpdate = jest.fn()
    renderComponent({
      onUpdate: mockUpdate,
      formValues: {
        snakeSpeed: 99,
        worldDimension: 99,
        snakeSize: 99,
        cellSize: 99,
      },
    })

    const validateInput = async (label: string, field: string) => {
      await userEvent.type(screen.getByLabelText(label), "1")
      expect(mockUpdate).not.toHaveBeenCalled()
      expect(
        await screen.findByText(field + " should be a number from 0 to 100")
      ).toBeInTheDocument()
    }

    await validateInput("Snake Speed (sec/100):", "snakeSpeed")
    await validateInput("World Dimension:", "worldDimension")
    await validateInput("Snake Size:", "snakeSize")
    await validateInput("Cell Size:", "cellSize")

    await userEvent.type(screen.getByLabelText("Cell Size:"), "{backspace}")
    expect(
      screen.queryByText("cellSize should be a number from 0 to 100")
    ).not.toBeInTheDocument()
  })

  it("should validate snakeSize cannot be larger than worldDimension", async () => {
    const mockUpdate = jest.fn()
    renderComponent({
      onUpdate: mockUpdate,
      formValues: {
        snakeSpeed: 99,
        worldDimension: 9,
        snakeSize: 9,
        cellSize: 0,
      },
    })

    await userEvent.type(screen.getByLabelText("Snake Size:"), "1")
    expect(mockUpdate).not.toHaveBeenCalled()
    expect(
      screen.getByText("snakeSize must be smaller than worldDimension")
    ).toBeInTheDocument()
  })

  it("should validate worldDimension cannot be smaller than snakeSize", async () => {
    const mockUpdate = jest.fn()
    renderComponent({
      onUpdate: mockUpdate,
      formValues: {
        snakeSpeed: 99,
        worldDimension: 1,
        snakeSize: 99,
        cellSize: 0,
      },
    })

    await userEvent.type(screen.getByLabelText("World Dimension:"), "1")
    expect(mockUpdate).not.toHaveBeenCalled()
    expect(
      screen.getByText("worldDimension must be larger than snakeCell")
    ).toBeInTheDocument()
  })

  it("should disable inputs when form is disabled", () => {
    renderComponent({ disabled: true })
    expect(screen.getByLabelText("World Dimension:")).toBeDisabled()
  })

  it("should be able to handle exceptional input cases", async () => {
    const mockUpdate = jest.fn()
    renderComponent({
      onUpdate: mockUpdate,
      formValues: {
        snakeSpeed: 99,
        worldDimension: 1,
        snakeSize: 99,
        cellSize: "",
      },
    })
    const inputElem = screen.getByLabelText("Cell Size:")
    await userEvent.type(inputElem, "a")
    expect(mockUpdate).not.toHaveBeenCalled()
    await userEvent.type(inputElem, "0")
    expect(mockUpdate).not.toHaveBeenCalled()
  })
})
