import { render, screen } from "@testing-library/react"
import ConfirmationDialog from "."
import userEvent from "@testing-library/user-event"

describe("ConfirmationDialog", () => {
  it("should render component correctly", async () => {
    render(
      <ConfirmationDialog
        title={"I am Title"}
        message={
          "Can you React from a shooting bullet travelling at lightspeed?"
        }
        onCancel={jest.fn()}
        onYesClick={jest.fn()}
        onNoClick={jest.fn()}
      />,
    )
    expect(screen.getByText("I am Title")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Can you React from a shooting bullet travelling at lightspeed?",
      ),
    ).toBeInTheDocument()
  })

  it("should have custom Yes/No button", async () => {
    render(
      <ConfirmationDialog
        title={"I am Title"}
        message={"Message one"}
        onCancel={jest.fn()}
        onYesClick={jest.fn()}
        onNoClick={jest.fn()}
        yesButtonText={"Yupe"}
        noButtonText={"Oh uh"}
      />,
    )

    screen.getByRole("button", { name: "Yupe" })
    screen.getByRole("button", { name: "Oh uh" })
  })

  it("should have a x if it is notModal", async () => {
    render(
      <ConfirmationDialog
        title={"I am Title"}
        message={"Message one"}
        onCancel={jest.fn()}
        onYesClick={jest.fn()}
        onNoClick={jest.fn()}
        yesButtonText={"Yupe"}
        noButtonText={"Oh uh"}
        isNotModal={true}
      />,
    )

    screen.getByRole("button", { name: "×" })
  })

  describe("Button clicks", () => {
    const renderComponent = () => {
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
        />,
      )
      return { onYesClick, onNoClick, onCancel }
    }

    const assertDialog = (isShown: boolean) => {
      if (isShown) {
        expect(screen.getByText("I am Title")).toBeInTheDocument()
      } else {
        expect(screen.queryByText("I am Title")).not.toBeInTheDocument()
      }
    }

    it("should close after Yes is clicked", async () => {
      const { onYesClick } = renderComponent()
      assertDialog(true)
      await userEvent.click(screen.getByRole("button", { name: "Yes" }))
      expect(onYesClick).toHaveBeenCalled()
      assertDialog(false)
    })

    it("should close after No is clicked", async () => {
      const { onNoClick } = renderComponent()
      assertDialog(true)
      await userEvent.click(screen.getByRole("button", { name: "No" }))
      expect(onNoClick).toHaveBeenCalled()
      assertDialog(false)
    })

    it("should close after Cancel is clicked", async () => {
      const { onCancel } = renderComponent()
      assertDialog(true)
      await userEvent.type(screen.getByRole("dialog"), "{escape}")
      expect(onCancel).toHaveBeenCalled()
      assertDialog(false)
    })

    it("should do still close if default of cancel is rendered as undefined", async () => {
      render(
        <ConfirmationDialog
          title={"I am Title"}
          message={
            "Can you React from a shooting bullet travelling at lightspeed?"
          }
          onYesClick={jest.fn()}
        />,
      )
      assertDialog(true)
      await userEvent.type(screen.getByRole("dialog"), "{escape}")
      assertDialog(false)
    })

    it("should do still close if default of No is rendered as undefined", async () => {
      render(
        <ConfirmationDialog
          title={"I am Title"}
          message={
            "Can you React from a shooting bullet travelling at lightspeed?"
          }
          onYesClick={jest.fn()}
        />,
      )
      assertDialog(true)
      await userEvent.click(screen.getByRole("button", { name: "No" }))
      assertDialog(false)
    })
  })
})
