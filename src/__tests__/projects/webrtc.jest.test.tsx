import { render, screen } from "@testing-library/react"
import React from "react"
import Webrtc from "@/app/projects/webrtc/page"
import { setEnv } from "../../__mocks__/apiMock"

describe("Webrtc", () => {
  const renderComponent = () => render(<Webrtc />)

  it("should have a menu and important loaded info", async () => {
    setEnv({
      NEXT_PUBLIC_PUSHER_APP_KEY: "APP123",
      NEXT_PUBLIC_PUSHER_CLUSTER: "CLUSTER123",
    })
    renderComponent()
    expect(screen.getByText("Video call with Web RTC")).toBeInTheDocument()
    expect(
      await screen.findByText("Video call with Web RTC")
    ).toBeInTheDocument()
    expect(screen.getByText("Identification")).toBeInTheDocument()
    expect(screen.getByText("List of online callers")).toBeInTheDocument()
  })

  it("should show warning if none of the environment is set", () => {
    renderComponent()
    expect(
      screen.getByText(
        "Pusher initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })
})
