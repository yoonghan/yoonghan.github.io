import { render, screen } from "@testing-library/react";
import Performance from "./page";

describe("Performance", () => {
	const renderComponent = () => {
		render(<Performance />);
	};

	it("should render Using React 18 Suspense", async () => {
		renderComponent();
		expect(screen.getByText("Using React 18 Suspense")).toBeInTheDocument();
	});
});
