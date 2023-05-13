import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import UserEvent from "@testing-library/user-event"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { EmptyStaticPropsContext, setEnv } from "../../__mocks__/apiMock"
import React from "react"
import Messenger, { getStaticProps } from "@/pages/projects/messenger"

describe("Messenger", () => {
  const renderComponent = () =>
    render(<Messenger appKey={"sampleAppKey"} cluster={"sampleCluster"} />)

  it("should have a menu and important loaded info", async () => {
    renderComponent()
    await assertMenu()
    expect(screen.getByText("A Walcron Chat Program")).toBeInTheDocument()
    expect(
      await screen.findByText("Status: Start Connecting")
    ).toBeInTheDocument()
    assertFooter()
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
