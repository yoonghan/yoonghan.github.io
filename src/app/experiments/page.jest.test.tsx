import Experiment from "./page"
import { render, screen } from "@testing-library/react"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"
import { findAllChildByPath } from "@/config/pages"
import { cards } from "./config"

describe("Experiments", () => {
  it("should render page correctly", async () => {
    render(<Experiment />)
    await assertScrollToTop()
    expect(screen.getByText("Experimental projects")).toBeInTheDocument()
  })

  it("should contain all Experiments submenus", () => {
    const allExperimentsPath = findAllChildByPath("/experiments").map(
      (child) => child.path
    )
    const cardsPath = cards.map((card) => card.href)

    expect(allExperimentsPath.sort()).toStrictEqual(cardsPath.sort())
  })
})
