import { getDefaultNormalizer, render, screen } from "@testing-library/react"
import ChatMessageDialog, { authors, userId } from "."
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
      formattedTime.length,
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
        message: "T|Second Message",
        createdOn,
        isSend: true,
      },
    ])

    expect(await screen.findByText("First Message")).toBeInTheDocument()
    expect(screen.getByText("Anon")).toBeInTheDocument()
    expect(screen.getByText("Second Message")).toBeInTheDocument()
    expect(
      screen.getAllByText(formatDateToTime(createdOn), {
        normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
      }),
    ).toHaveLength(2)
  })

  it("should have the first authors to be the user", () => {
    expect(userId).toBe(authors[0].id)
  })
})
