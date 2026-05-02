import { render, screen } from "@testing-library/react"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"
import { findPageByPath } from "@/config/pages"
import { cards } from "./config"
import Projects, { metadata } from "./page"

describe("Projects", () => {
	const renderComponent = () => {
		render(<Projects />)
	}

	it("should render the page with the important components", async () => {
		renderComponent()
		expect(screen.getByText("Projects Portfolio"))
		await assertScrollToTop()
	})

	it("should have cards pointing to right projects", () => {
		const localCards = cards.filter((card) => card.href.startsWith("/"))
		localCards.forEach((localCard) => {
			const localCardHref = localCard.href
			expect(findPageByPath(localCardHref)?.path).toBe(localCardHref)
		})
	})

	it("should render the right metaData", () => {
		expect(metadata).toEqual({
			title: "Projects Portfolio",
			description: "Playground projects that we had been working on.",
			alternates: {},
		})
	})
})