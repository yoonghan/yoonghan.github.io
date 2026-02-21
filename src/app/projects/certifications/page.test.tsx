import { render } from "@testing-library/react"
import Learning from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("Learning", () => {
  const renderComponent = () => {
    render(<Learning />)
  }

  it("should have a scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })
})
