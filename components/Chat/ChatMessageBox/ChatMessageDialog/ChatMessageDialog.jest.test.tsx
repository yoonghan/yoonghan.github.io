import { render, screen } from "@testing-library/react"
import ChatMessageDialog from "."
import { Message } from "react-bell-chat"

describe("ChatMessageDialog", () => {
  const renderComponent = (message?: Message[]) =>
    render(<ChatMessageDialog initialMessage={message} />)

  const formatDateToTime = (date: Date): string => {
    let formattedTime = date.toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    })
    formattedTime = formattedTime.substring(
      formattedTime.startsWith("0") ? 1 : 0,
      formattedTime.length
    )
    return formattedTime
  }

  it("should render component correctly", async () => {
    const createdOn = new Date()
    renderComponent([
      {
        id: 0,
        authorId: 1,
        message: "First Message",
        createdOn,
        isSend: true,
      },
      {
        id: 1,
        authorId: 2,
        message: "Second Message",
        createdOn,
        isSend: true,
      },
    ])
    expect(await screen.findByText("ME")).toBeInTheDocument()
    expect(screen.getByText("First Message")).toBeInTheDocument()
    expect(screen.getByText("SEC")).toBeInTheDocument()
    expect(screen.getByText("Second Message")).toBeInTheDocument()
    expect(screen.getAllByText(formatDateToTime(createdOn))).toHaveLength(2)
  })
})
