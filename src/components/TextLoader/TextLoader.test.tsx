import { render, screen } from "@testing-library/react";
import TextLoader from "./TextLoader";

describe("TextLoader", () => {
	const renderComponent = () => {
		render(<TextLoader text="Warming Up Container" />);
	};

	it("should render correctly", () => {
		renderComponent();
		expect(screen.getByText("Warming Up Container")).toBeInTheDocument();
		expect(screen.getAllByText(".")).toHaveLength(3);
	});
});
