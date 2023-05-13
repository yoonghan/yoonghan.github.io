import { render, screen } from "@testing-library/react"
import "../../__mocks__/routerMock"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { EmptyStaticPropsContext, setEnv } from "../../__mocks__/apiMock"
import React from "react"
import Webrtc, { getStaticProps } from "@/pages/projects/webrtc"

describe("Webrtc", () => {
  const renderComponent = () =>
    render(<Webrtc appKey={"sampleAppKey"} cluster={"sampleCluster"} />)

  it("should have a menu and important loaded info", async () => {
    renderComponent()
    await assertMenu()
    expect(screen.getByText("Video call with Web RTC")).toBeInTheDocument()
    expect(
      await screen.findByText("Video call with Web RTC")
    ).toBeInTheDocument()
    expect(screen.getByText("Identification")).toBeInTheDocument()
    expect(screen.getByText("List of online callers")).toBeInTheDocument()
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
    render(<Webrtc appKey={""} cluster={""} />)
    expect(
      screen.getByText(
        "Pusher initialization failed due to missing environment variable."
      )
    ).toBeInTheDocument()
  })
})
