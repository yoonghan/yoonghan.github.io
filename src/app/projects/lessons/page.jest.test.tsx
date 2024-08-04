import { render } from "@testing-library/react"
import Lessons from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("Lessons", () => {
  const renderComponent = () => {
    render(<Lessons />)
  }

  it("should have a scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })
})
