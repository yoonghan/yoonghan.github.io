import { screen, renderHook } from "@testing-library/react"
import { act } from "react"
import { useDialogCreation } from "./useDialogCreation"
import userEvent from "@testing-library/user-event"
import { ConfirmDialogProps } from "react-confirm"

describe("useDialogCreation", () => {
  const Wrapper = ({
    attr,
    proceed,
  }: ConfirmDialogProps<{ attr: string }, string>) => (
    <div>
      {attr}
      <button onClick={() => proceed("done")}>Yes</button>
    </div>
  )

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    let dialogRoot = document.getElementById("dialog-root")
    if (!dialogRoot) {
      dialogRoot = document.createElement("div")
      dialogRoot.id = "dialog-root"
      document.body.appendChild(dialogRoot)
    } else {
      dialogRoot.innerHTML = "" // Clear existing content
    }
  })

  it("should be able to prompt for confirmation", async () => {
    const testText = "sample"
    const { result } = renderHook(useDialogCreation, { initialProps: Wrapper })

    let response: Promise<string | undefined> = new Promise(() => {})
    const confirmation = result.current

    await act(async () => {
      response = confirmation({ attr: testText })
    })
    expect(screen.getByText(testText)).toBeInTheDocument()

    await userEvent.click(screen.getByText("Yes"))

    expect(await response).toBe("done")
  })

  it("should be able to confirm but without a prompt", async () => {
    const testText = "no prompt"

    const { result } = renderHook(
      (component) => useDialogCreation(component, true),
      { initialProps: Wrapper },
    )

    const confirmation = result.current
    act(() => {
      confirmation({ attr: testText })
    })

    expect(screen.queryByText(testText)).not.toBeInTheDocument()
  })
})
