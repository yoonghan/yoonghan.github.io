import { render, screen } from "@testing-library/react";
import Index from "./page";

describe("main page", () => {
	it("should render main page", async () => {
		render(<Index />);
		expect(
			screen.getByRole("heading", { name: "DevOps Solution Portal" }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole("link", { name: "git" }),
		).toBeInTheDocument();
	});
});
