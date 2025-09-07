import { render, screen, fireEvent } from "@testing-library/react"
import Projects from "./page"
import { cards } from "./config"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"
import { findPageByPath } from "@/config/pages"

describe("Projects", () => {
  const renderComponent = () => {
    render(<Projects />)
  }

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("Playground projects"))
    assertScrollToTop()
  })

  it("should have cards pointing to right projects", () => {
    const localCards = cards.filter((card) => card.href.startsWith("/"))
    localCards.forEach((localCard) => {
      const localCardHref = localCard.href
      expect(findPageByPath(localCardHref)?.path).toBe(localCardHref)
    })
  })
})
