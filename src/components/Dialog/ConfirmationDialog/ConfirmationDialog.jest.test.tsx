import { render, screen } from "@testing-library/react"
import ConfirmationDialog from "."
import UserEvent from "@testing-library/user-event"

describe("ConfirmationDialog", () => {
  it("should render component correctly", async () => {
    const onYesClick = jest.fn()
    const onNoClick = jest.fn()
    const onCancel = jest.fn()
    render(
      <ConfirmationDialog
        title={"I am Title"}
        message={
          "Can you React from a shooting bullet travelling at lightspeed?"
        }
        onCancel={onCancel}
        onYesClick={onYesClick}
        onNoClick={onNoClick}
      />
    )
    expect(screen.getByText("I am Title")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Can you React from a shooting bullet travelling at lightspeed?"
      )
    ).toBeInTheDocument()

    await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(onYesClick).toBeCalled()

    await UserEvent.click(screen.getByRole("button", { name: "No" }))
    expect(onNoClick).toBeCalled()

    await UserEvent.type(
      screen.getByRole("button", { name: "Yes" }),
      "{escape}"
    )
    expect(onCancel).toBeCalled()
  })

  it("should have custom Yes/No button", async () => {
    const onYesClick = jest.fn()
    const onNoClick = jest.fn()
    render(
      <ConfirmationDialog
        title={"I am Title"}
        message={"Message one"}
        onCancel={jest.fn()}
        onYesClick={onYesClick}
        onNoClick={onNoClick}
        yesButtonText={"Yupe"}
        noButtonText={"Oh uh"}
      />
    )

    await UserEvent.click(screen.getByRole("button", { name: "Yupe" }))
    expect(onYesClick).toBeCalled()

    await UserEvent.click(screen.getByRole("button", { name: "Oh uh" }))
    expect(onNoClick).toBeCalled()
  })
})
