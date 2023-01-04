import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import UploadConfirmDialog from "."

describe("UploadConfirmDialog", () => {
  it("should render help dialog correctly", () => {
    render(<UploadConfirmDialog onReplyClick={jest.fn()} />)
    expect(
      screen.getByText("This file will be shared publicly. Are you sure?")
    ).toBeInTheDocument()
  })

  it("should trigger yes if button yes is clicked", async () => {
    const responseFn = jest.fn()
    render(<UploadConfirmDialog onReplyClick={responseFn} />)

    await userEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(responseFn).toHaveBeenCalledTimes(1)
    expect(responseFn).toHaveBeenCalledWith("yes")
  })

  it("should trigger no if button no is clicked", async () => {
    const responseFn = jest.fn()
    render(<UploadConfirmDialog onReplyClick={responseFn} />)

    await userEvent.click(screen.getByRole("button", { name: "No" }))
    expect(responseFn).toHaveBeenCalledTimes(1)
    expect(responseFn).toHaveBeenCalledWith("no")
  })
})
