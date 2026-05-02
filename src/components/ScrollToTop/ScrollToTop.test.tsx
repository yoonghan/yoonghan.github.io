import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ScrollToTopWithNoSSR from "./ScrollToTopNoSSR"

describe("ScrollToTop", () => {
	const scrollPoint = 501

	const advanceScroll = () => {
		fireEvent.scroll(window, {})
	}

	it("should render scroller when the right location is met", async () => {
		render(<ScrollToTopWithNoSSR />)

		const scrollButton = screen.getByText("TOP")

		expect(scrollButton).toHaveClass("hidden")

		window.scrollTo(0, scrollPoint)
		advanceScroll()
		expect(scrollButton).not.toHaveClass("hidden")

		//test return
		const timedUserEvent = userEvent.setup()

		await timedUserEvent.click(scrollButton)
		expect(window.scrollY).toBe(0)
		advanceScroll()
		expect(scrollButton).toHaveClass("hidden")
	})

	describe("listener mounting", () => {
		let adder: vi.SpyInstance, remover: vi.SpyInstance

		beforeEach(() => {
			adder = vi
				.spyOn(window, "addEventListener")
				.mockImplementation(() => {})
			remover = vi
				.spyOn(window, "removeEventListener")
				.mockImplementation(() => {})
		})

		afterEach(() => {
			if (adder) {
				adder.mockReset()
			}
			if (remover) {
				remover.mockReset()
			}
		})

		it("should unmount gracefully", async () => {
			const { unmount } = render(<ScrollToTopWithNoSSR />)

			expect(adder).toHaveBeenCalledWith("scroll", expect.anything())

			unmount()

			expect(remover).toHaveBeenCalledWith("scroll", expect.anything())
		})

		it("should just mount once", async () => {
			const { rerender } = render(<ScrollToTopWithNoSSR />)

			expect(adder).toHaveBeenCalledTimes(1)

			rerender(<ScrollToTopWithNoSSR />)

			expect(adder).toHaveBeenCalledTimes(1)
		})
	})
})