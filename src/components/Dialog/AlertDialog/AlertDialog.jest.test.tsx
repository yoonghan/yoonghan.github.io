import { render, screen } from "@testing-library/react"
import AlertDialog from "."
import UserEvent from "@testing-library/user-event"

describe("AlertDialog", () => {
  it("should render component correctly", async () => {
    render(
      <AlertDialog
        title={"I am Title"}
        message={
          "Can you React from a shooting bullet travelling at lightspeed?"
        }
        onOk={jest.fn()}
      />
    )
    expect(screen.getByText("I am Title")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Can you React from a shooting bullet travelling at lightspeed?"
      )
    ).toBeInTheDocument()
  })

  it("should have custom Ok button", async () => {
    render(
      <AlertDialog
        title={"I am Title"}
        message={"Message one"}
        onOk={jest.fn()}
        okBtnText={"I am fine"}
      />
    )

    screen.getByRole("button", { name: "I am fine" })
  })

  describe("Button clicks", () => {
    const renderComponent = () => {
      const onOk = jest.fn()
      render(
        <AlertDialog
          title={"I am Title"}
          message={
            "Can you React from a shooting bullet travelling at lightspeed?"
          }
          onOk={onOk}
        />
      )
      return { onOk }
    }

    const assertDialog = (isShown: boolean) => {
      if (isShown) {
        expect(screen.getByText("I am Title")).toBeInTheDocument()
      } else {
        expect(screen.queryByText("I am Title")).not.toBeInTheDocument()
      }
    }

    it("should close after Ok is clicked", async () => {
      const { onOk } = renderComponent()
      assertDialog(true)
      await UserEvent.click(screen.getByRole("button", { name: "Ok" }))
      expect(onOk).toBeCalled()
      assertDialog(false)
    })

    it("should close after Cancel is clicked", async () => {
      const { onOk } = renderComponent()
      assertDialog(true)
      await UserEvent.type(screen.getByRole("dialog"), "{escape}")
      expect(onOk).toBeCalled()
      assertDialog(false)
    })
  })
})
