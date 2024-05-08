import { render, screen } from "@testing-library/react"
import Checklist from "@/app/projects/checklist/page"
import { assertScrollToTop } from "../utils/_scrollToTop"

describe("Checklist", () => {
  const renderComponent = async () => {
    render(<Checklist />)
  }

  it("should render the page with the important components", async () => {
    renderComponent()
    await assertScrollToTop()
    expect(screen.getByText("Important Checklist Links"))
    expect(screen.getByText("PWA"))
    expect(screen.getByText("CronJob"))
  })
})
