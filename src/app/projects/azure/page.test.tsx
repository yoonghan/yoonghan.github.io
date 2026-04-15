import { render, screen } from "@testing-library/react"
import AzureIntegration from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("Azure Integration", () => {
    const renderComponent = () => {
        render(<AzureIntegration />)
    }

    it("should render correctly", async () => {
        renderComponent()
        expect(screen.getByText("Azure Integration")).toBeInTheDocument()
    })
})
