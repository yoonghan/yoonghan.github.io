import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ChatterForm from "."

describe("ChatterFrom", () => {
  const renderComponent = ({
    senderButtonCanStop = false,
    senderButtonDisabled = false,
    callerButtonDisabled = false,
    startStopSenderVideo = jest.fn(),
    startStopCallerVideo = jest.fn(),
  }: {
    senderButtonCanStop?: boolean
    senderButtonDisabled?: boolean
    callerButtonDisabled?: boolean
    startStopSenderVideo?: () => void
    startStopCallerVideo?: () => void
  }) => {
    render(
      <ChatterForm
        senderButtonCanStop={senderButtonCanStop}
        senderButtonDisabled={senderButtonDisabled}
        callerButtonDisabled={callerButtonDisabled}
        startStopSenderVideo={startStopSenderVideo}
        startStopCallerVideo={startStopCallerVideo}
      />
    )
  }

  it("should render default component", () => {
    renderComponent({})
    expect(screen.getByLabelText("My user name:")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Start" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Call" })).toBeDisabled()
  })

  it("should render Call disabled if Sender button is disabled", () => {
    renderComponent({
      senderButtonCanStop: true,
      senderButtonDisabled: true,
      callerButtonDisabled: false,
    })
    expect(screen.getByRole("button", { name: "Stop" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Call" })).toBeDisabled()
  })

  it("should render Call is disabled if senderButtonDisabled=false and senderButtonCanStop=true", () => {
    renderComponent({
      senderButtonCanStop: true,
      senderButtonDisabled: false,
      callerButtonDisabled: true,
    })
    expect(screen.getByRole("button", { name: "Stop" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Call" })).toBeDisabled()
  })

  it("should trigger startStopCallerVideo when Call button is clickable", async () => {
    const startStopCallerVideo = jest.fn()
    renderComponent({
      senderButtonCanStop: true,
      senderButtonDisabled: false,
      callerButtonDisabled: false,
      startStopCallerVideo,
    })
    await userEvent.click(screen.getByRole("button", { name: "Call" }))
    expect(startStopCallerVideo).toHaveBeenCalled()
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

  it("should hide error once user retype", async () => {
    renderComponent({})
    const input = screen.getByLabelText("My user name:")
    await userEvent.type(input, "@")
    expect(
      screen.queryByText("Username can only contains alphabets and numbers.")
    ).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Start" }))
    expect(
      screen.getByText("Username can only contains alphabets and numbers.")
    ).toBeInTheDocument()
    await userEvent.type(input, "{backspace}A")
    expect(
      screen.queryByText("Username can only contains alphabets and numbers.")
    ).not.toBeInTheDocument()
  })
})
