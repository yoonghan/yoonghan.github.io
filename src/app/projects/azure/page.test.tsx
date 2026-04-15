import { render, screen } from "@testing-library/react"
import AzureIntegration from "./page"

describe("Azure Integration", () => {
    const renderComponent = () => {
        render(<AzureIntegration />)
    }

    it("should render correctly", async () => {
        renderComponent()
        expect(screen.getByRole("heading", { name: "Azure Integration for TODO List" })).toBeInTheDocument()
        expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
        expect(await screen.findByTestId("azure-integration")).toBeInTheDocument()
    })
})
