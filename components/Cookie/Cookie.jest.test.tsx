import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Cookie from "."

describe("Cookie", () => {
  it("should display cookie message", () => {
    render(<Cookie isClosed={false} cookieName={"term"} />)
    expect(screen.getByText("This site uses cookies.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "refer here" })).toHaveAttribute(
      "href",
      "https://policies.google.com/technologies/cookies"
    )
  })

  it("should not display cookie message if it's closed", () => {
    render(<Cookie isClosed={true} cookieName={"term"} />)
    expect(
      screen.queryByText("This site uses cookies.")
    ).not.toBeInTheDocument()
  })

  it("should update document cookie when clicked", async () => {
    render(<Cookie isClosed={false} cookieName={"term"} />)
    await userEvent.click(screen.getByRole("button", { name: "Close" }))
    expect(document.cookie).toEqual("term=true")
  })

  it("should have a 'cookie' role for testing", () => {
    render(<Cookie isClosed={false} cookieName={"term"} />)
    expect(screen.getByTestId("cookie-dialog")).toBeInTheDocument()
  })
})
