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
})
