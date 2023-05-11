import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ChatterForm from "."

describe("ChatterFrom", () => {
  const renderComponent = ({
    senderButtonCanStop = false,
    senderButtonDisabled = false,
    startStopSenderVideo = jest.fn(),
  }: {
    senderButtonCanStop?: boolean
    senderButtonDisabled?: boolean
    startStopSenderVideo?: () => void
  }) => {
    render(
      <ChatterForm
        senderButtonCanStop={senderButtonCanStop}
        senderButtonDisabled={senderButtonDisabled}
        startStopSenderVideo={startStopSenderVideo}
      />
    )
  }

  it("should render default component", () => {
    renderComponent({})
    expect(screen.getByLabelText("My user name:")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Start" })).toBeEnabled()
  })

  it("should render Stop disabled if Sender button is disabled", () => {
    renderComponent({
      senderButtonCanStop: true,
      senderButtonDisabled: true,
    })
    expect(screen.getByRole("button", { name: "Stop" })).toBeDisabled()
  })

  it("should render Stop button enabled, but disallow input when senderButtonDisabled=false", () => {
    renderComponent({
      senderButtonCanStop: true,
      senderButtonDisabled: false,
    })
    const input = screen.getByLabelText("My user name:")
    expect(input).toBeDisabled()
    expect(screen.getByRole("button", { name: "Stop" })).toBeEnabled()
  })

  it("should allow non-empty valid name submit", async () => {
    const startStopSenderVideo = jest.fn()
    const userNameBobMarley = "Bob Marl3y"
    renderComponent({ startStopSenderVideo })
    const input = screen.getByLabelText("My user name:")
    expect(input).toHaveValue("")
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(startStopSenderVideo).not.toHaveBeenCalled()
    await userEvent.type(input, userNameBobMarley)
    expect(input).toHaveValue(userNameBobMarley)
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(startStopSenderVideo).toHaveBeenCalledWith(userNameBobMarley)
  })

  it("should not allow to submit if name contains special characters", async () => {
    const startStopSenderVideo = jest.fn()
    renderComponent({ startStopSenderVideo })
    const input = screen.getByLabelText("My user name:")
    await userEvent.type(input, "l33tC@")
    expect(input).toHaveValue("l33tC@")
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(startStopSenderVideo).not.toHaveBeenCalled()
  })

  it("should not allow to submit if name is less than 3 characters", async () => {
    const startStopSenderVideo = jest.fn()
    renderComponent({ startStopSenderVideo })
    const input = screen.getByLabelText("My user name:")
    await userEvent.type(input, "na")
    expect(input).toHaveValue("na")
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(startStopSenderVideo).not.toHaveBeenCalled()
  })

  it("should hide error once user retype", async () => {
    const errorMessage =
      "Username can only contains alphabets and numbers with 3 min characters."
    renderComponent({})
    const input = screen.getByLabelText("My user name:")
    await userEvent.type(input, "@")
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    await userEvent.type(input, "{backspace}A")
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
  })
})
