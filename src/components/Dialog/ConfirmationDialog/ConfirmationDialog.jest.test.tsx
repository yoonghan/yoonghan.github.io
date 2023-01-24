import { render, screen, waitFor } from "@testing-library/react"
import ConfirmationDialog, { confirmationDialogWrapper } from "."
import UserEvent from "@testing-library/user-event"

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
      />
    )
    expect(screen.getByText("I am Title")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Can you React from a shooting bullet travelling at lightspeed?"
      )
    ).toBeInTheDocument()
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

    screen.getByRole("button", { name: "Yupe" })
    screen.getByRole("button", { name: "Oh uh" })
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
        />
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
      await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
      expect(onYesClick).toBeCalled()
      assertDialog(false)
    })

    it("should close after No is clicked", async () => {
      const { onNoClick } = renderComponent()
      assertDialog(true)
      await UserEvent.click(screen.getByRole("button", { name: "No" }))
      expect(onNoClick).toBeCalled()
      assertDialog(false)
    })

    it("should close after Cancel is clicked", async () => {
      const { onCancel } = renderComponent()
      assertDialog(true)
      await UserEvent.type(screen.getByRole("dialog"), "{escape}")
      expect(onCancel).toBeCalled()
      assertDialog(false)
    })
  })

  describe("Confirmation dialog", () => {
    const Wrapper = ({
      onCancel,
      onYesClick,
      onNoClick,
    }: {
      onCancel: () => void
      onYesClick: () => void
      onNoClick: () => void
    }) => {
      const onClick = async () => {
        await confirmationDialogWrapper({
          title: "Sample Title",
          message: "Dialog Pop up",
          onCancel: onCancel,
          onYesClick: onYesClick,
          onNoClick: onNoClick,
        })
      }

      return <button onClick={onClick}>Click Me</button>
    }

    it("should trigger a dialog when clicked and can close on Yes button pressed", async () => {
      const yesBtnFn = jest.fn()
      render(
        <Wrapper
          onCancel={jest.fn()}
          onYesClick={yesBtnFn}
          onNoClick={jest.fn()}
        />
      )
      await UserEvent.click(screen.getByText("Click Me"))
      expect(await screen.findByText("Sample Title")).toBeInTheDocument()
      await UserEvent.click(await screen.findByRole("button", { name: "Yes" }))
      expect(yesBtnFn).toBeCalled()
      await waitFor(() => {
        expect(screen.queryByText("Sample Title")).not.toBeInTheDocument()
      })
    })
  })
})
