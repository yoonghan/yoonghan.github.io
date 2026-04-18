import { render, screen } from "@testing-library/react";
import Aria from "./page";

describe("Aria", () => {
	it("should render page correctly", async () => {
		render(<Aria />);
		expect(screen.getByText("Accessibility (WCAG)")).toBeInTheDocument();
	});
});
