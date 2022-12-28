import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DownloadConfirmDialog from "."

describe("DownloadConfirmDialog", () => {
  it("should render help dialog correctly", () => {
    render(<DownloadConfirmDialog onReplyClick={jest.fn()} />)
    expect(
      screen.getByText(
        "It's a public file and may contain malicious content. Are you sure you want to download it?"
      )
    ).toBeInTheDocument()
  })

  it("should trigger yes if button yes is clicked", async () => {
    const responseFn = jest.fn()
    render(<DownloadConfirmDialog onReplyClick={responseFn} />)

    await userEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(responseFn).toHaveBeenCalledTimes(1)
    expect(responseFn).toHaveBeenCalledWith("yes")
  })

  it("should trigger no if button no is clicked", async () => {
    const responseFn = jest.fn()
    render(<DownloadConfirmDialog onReplyClick={responseFn} />)

    await userEvent.click(screen.getByRole("button", { name: "No" }))
    expect(responseFn).toHaveBeenCalledTimes(1)
    expect(responseFn).toHaveBeenCalledWith("no")
  })
})
