import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RecipientList from "."

describe("RecipientList", () => {
  it("should be able to render list of users and can be triggered", async () => {
    const users = [
      {
        id: "1",
        name: "number1",
      },
      {
        id: "2",
        name: "alicia",
      },
    ]
    const callbackFn = jest.fn()

    render(
      <RecipientList
        recipients={users}
        recipientTriggered={callbackFn}
        disabled={false}
      />
    )

    expect(screen.getByRole("button", { name: "Call number1" })).toBeEnabled()

    await userEvent.click(screen.getByRole("button", { name: "Call alicia" }))

    expect(callbackFn).toBeCalledWith({ id: "2", name: "alicia" })
  })

  it("should be able to render list of disabled buttons that can't be triggered", async () => {
    const users = [
      {
        id: "1",
        name: "number1",
      },
      {
        id: "2",
        name: "alicia",
      },
    ]
    const callbackFn = jest.fn()

    render(
      <RecipientList
        recipients={users}
        recipientTriggered={callbackFn}
        disabled={true}
      />
    )

    expect(screen.getByRole("button", { name: "Call number1" })).toBeDisabled()

    await userEvent.click(screen.getByRole("button", { name: "Call alicia" }))

    expect(callbackFn).not.toBeCalledWith({ id: "2", name: "alicia" })
  })
})
