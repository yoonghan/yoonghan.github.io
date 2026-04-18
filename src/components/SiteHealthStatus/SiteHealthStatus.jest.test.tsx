import { render, screen } from "@testing-library/react";
import SiteHealthStatus from "./index";

describe("SiteHealthStatus component", () => {
	it("renders the component with health status badges", () => {
		render(
			<SiteHealthStatus
				repo="yoonghan/yoonghan.github.io"
				codecovToken="TEST_TOKEN"
			/>,
		);
		// Check if badges are rendered
		expect(
			screen.getByAltText("Report merged result on main branch"),
		).toBeInTheDocument();
		expect(screen.getByAltText("Code coverage")).toBeInTheDocument();
		expect(screen.getByAltText("Bugs")).toBeInTheDocument();
		expect(screen.getByAltText("Code Smells")).toBeInTheDocument();
		expect(screen.getByAltText("Vulnerabilities")).toBeInTheDocument();
		expect(screen.getByAltText("Security Rating")).toBeInTheDocument();
	});

	it("computes the correct SonarCloud project ID by replacing slashes with underscores", () => {
		render(
			<SiteHealthStatus
				repo="test-owner/test-project"
				codecovToken="TEST_TOKEN"
			/>,
		);

		const bugsBadge = screen.getByAltText("Bugs") as HTMLImageElement;
		expect(bugsBadge.src).toContain(
			"project=test-owner_test-project&metric=bugs",
		);
	});
});
