import { screen, waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { useDialogCreation } from "./useDialogCreation"

type Props = {
  attr: string
}

describe("useDialogCreation", () => {
  const Wrapper = (props: Props) => <div>{props.attr}</div>

  it("should be able to prompt for confirmation", async () => {
    const testText = "sample"
    const { result } = renderHook(useDialogCreation, { initialProps: Wrapper })
    const confirmation = result.current
    act(() => {
      confirmation({ attr: testText })
    })
    await waitFor(() => {
      expect(screen.getByText(testText)).toBeInTheDocument()
    })
  })
})
