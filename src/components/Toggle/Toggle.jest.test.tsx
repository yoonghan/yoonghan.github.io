import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Toggle from "./index"

describe("Toggle", () => {
  it("renders the label", () => {
    render(<Toggle label="Test Label" />)
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  it("renders the checkbox", () => {
    render(<Toggle label="Test Label" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("checkbox is enabled by default", () => {
    render(<Toggle label="Test Label" />)
    expect(screen.getByRole("checkbox")).not.toBeDisabled()
  })

  it("checkbox is disabled when disabled prop is true", () => {
    render(<Toggle label="Test Label" disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("calls onChange when checkbox is clicked", async () => {
    const handleChange = jest.fn()
    render(<Toggle label="Test Label" onChange={handleChange} />)
    const checkbox = screen.getByRole("checkbox")
    await userEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it("checkbox reflects checked prop", () => {
    const { rerender } = render(<Toggle label="Test Label" checked={false} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
    rerender(<Toggle label="Test Label" checked={true} />)
    expect(checkbox).toBeChecked()
  })
})
