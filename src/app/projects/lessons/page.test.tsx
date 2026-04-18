import { render } from "@testing-library/react";
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop";
import Lessons, { metadata } from "./page";

describe("Lessons", () => {
	const renderComponent = () => {
		render(<Lessons />);
	};

	it("should have a scroll to top", async () => {
		renderComponent();
		await assertScrollToTop();
	});

	it("should render the right metaData", () => {
		expect(metadata.alternates).toEqual({});
	});
});
