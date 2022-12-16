import { render, screen } from "@testing-library/react"
import "../../__mocks__/apiMock"
import UserEvent from "@testing-library/user-event"
import Messenger, { config, getStaticProps } from "@/pages/projects/messenger"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { EmptyStaticPropsContext, setEnv } from "../../__mocks__/apiMock"
import React from "react"

jest.mock("next/router", () => require("next-router-mock"))

describe("Messenger", () => {
  const renderComponent = () =>
    render(<Messenger appKey={"sampleAppKey"} cluster={"sampleCluster"} />)

  it("should have a menu", async () => {
    renderComponent()
    await assertMenu()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("A Walcron Chat Program")).toBeInTheDocument()
  })

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })

  it("should expose config with runtime set to nodejs as edge will not work", () => {
    expect(config).toStrictEqual({ runtime: "nodejs" })
  })

  it("should get env props wrapped in props object", async () => {
    setEnv({
      NEXT_PUBLIC_PUSHER_APP_KEY: "APP123",
      NEXT_PUBLIC_PUSHER_CLUSTER: "CLUSTER123",
    })
    const props = await getStaticProps(EmptyStaticPropsContext)
    expect(props).toStrictEqual({
      props: {
        appKey: "APP123",
        cluster: "CLUSTER123",
      },
    })
  })

  it("should show warning if none of the environment is set", () => {
    render(<Messenger appKey={""} cluster={""} />)
    expect(
      screen.getByText(
        "Messenger initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })

  it("should be able to send a message", async () => {
    renderComponent()
    await UserEvent.type(
      screen.getByPlaceholderText("Your Message"),
      "sample message"
    )
    await UserEvent.click(screen.getByRole("button", { name: "Send" }))

    expect(screen.getByLabelText("Message:")).toHaveValue("")
    expect(screen.getByText("sample message")).toBeInTheDocument()
  })

  it("should send a disconnect when component is unmounted", async () => {
    const debugEventFn = jest.fn()
    const spy = jest
      .spyOn(React, "useDebugValue")
      .mockImplementation(debugEventFn)
    const { unmount } = renderComponent()
    unmount()
    expect(debugEventFn).toBeCalledWith("connection:Disconnected")
    spy.mockClear()
  })
})
