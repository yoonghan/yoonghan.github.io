import { render } from "@testing-library/react"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"
import Learning, { metadata } from "./page"

describe("Learning", () => {
	const renderComponent = () => {
		render(<Learning />)
	}

	it("should have a scroll to top", async () => {
		renderComponent()
		await assertScrollToTop()
	})

	it("should render the right metaData", () => {
		expect(metadata.alternates).toEqual({})
	})
})