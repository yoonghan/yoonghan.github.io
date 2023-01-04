import { MessageType } from "../../../config/MessageType"
import { render, screen } from "@testing-library/react"
import CustomSystemChatBubble from "."

describe("CustomSystemChatBubble", () => {
  it("should render complex text correctly", () => {
    render(
      <CustomSystemChatBubble
        message={{ message: "T|Hello World" }}
        yourAuthorId={0}
      />
    )
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("should render regular text correctly", () => {
    render(
      <CustomSystemChatBubble
        message={{ message: "F|Filed Text" }}
        yourAuthorId={0}
      />
    )
    expect(screen.getByText("Filed Text")).toBeInTheDocument()
  })

  it("should render connection text correctly", () => {
    render(
      <CustomSystemChatBubble
        message={{
          message: `${MessageType.CONNECTION}|Connection OK`,
        }}
        yourAuthorId={0}
      />
    )
    expect(screen.getByText("Connection OK")).toBeInTheDocument()
    expect(screen.getByText("Connection OK")).toHaveStyle({
      color: "deepskyblue",
    })
  })

  it("should render connection error text correctly", () => {
    render(
      <CustomSystemChatBubble
        message={{
          message: `${MessageType.CONNECTION_ERROR}|Connection Error`,
        }}
        yourAuthorId={0}
      />
    )
    expect(screen.getByText("Connection Error")).toBeInTheDocument()
    expect(screen.getByText("Connection Error")).toHaveStyle({
      color: "darkred",
    })
  })
})
