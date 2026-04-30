import { render, screen } from "@testing-library/react"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"
import History, { metadata } from "./page"

describe("History", () => {
	const renderComponent = () => {
		render(<History />)
	}

	it("should have a menu and scroll to top", async () => {
		renderComponent()
		await assertScrollToTop()
	})

	it("should render the page with the important components", () => {
		renderComponent()
		expect(screen.getByText("Site's history")).toBeInTheDocument()
		expect(screen.getByText("Motivational books")).toBeInTheDocument()
	})

	it("should be able to scroll up", async () => {
		renderComponent()
		await assertScrollToTop()
	})

	it("should have the right metadata", () => {
		expect(metadata).toStrictEqual({
			title: "Website History",
			description: "Timeline and journey of the page.",
			alternates: {},
		})
	})
})