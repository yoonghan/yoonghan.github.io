import { render } from "@testing-library/react"
import Lessons from "@/app/projects/lessons/page"
import { assertScrollToTop } from "../utils/_scrollToTop"

describe("Lessons", () => {
  const renderComponent = () => {
    render(<Lessons />)
  }

  it("should have a scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })
})
