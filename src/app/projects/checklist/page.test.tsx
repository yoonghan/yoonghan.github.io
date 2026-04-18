import "@/__tests__/mocks/fetchMock";
import { render, screen } from "@testing-library/react";
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop";
import Checklist, { metadata } from "./page";

describe("Checklist", () => {
	const renderComponent = () => {
		render(<Checklist />);
	};

	it("should render the page with the important components", async () => {
		renderComponent();
		await assertScrollToTop();
		expect(screen.getByText("Important Checklist Links"));
		expect(screen.getByText("CronJob"));
		expect(screen.getByText("Since Deployment"));
		expect(screen.getByText("Today's Run"));
		// don't mock fetch, we want it to run once
	});

	it("should render the right metaData", () => {
		expect(metadata.alternates).toEqual({});
	});
});
