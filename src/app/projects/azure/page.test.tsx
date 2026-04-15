import "@/__tests__/mocks/fetchMock"
import { render, screen } from "@testing-library/react"
import { fetchMock } from "@/__tests__/mocks/fetchMock"

describe("Azure Integration", () => {
    beforeEach(() => {
        jest.resetModules()
        fetchMock.mockReset()
    })

    const renderComponent = async () => {
        const { default: AzureIntegration } = await import("./page")
        render(<AzureIntegration />)
    }

    it("should render correctly", async () => {
        fetchMock.mockResolvedValue({
            text: () => Promise.resolve("ready"),
        })

        await renderComponent()
        expect(screen.getByRole("heading", { name: "Azure Integration for TODO List" })).toBeInTheDocument()
        expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
        expect(await screen.findByTestId("azure-integration")).toBeInTheDocument()
    })

    it("should display error message on failed response", async () => {
        fetchMock.mockRejectedValue(new Error("Unable to fetch"))

        await renderComponent()
        expect(screen.getByRole("heading", { name: "Azure Integration for TODO List" })).toBeInTheDocument()
        expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
        expect(await screen.findByText("Unable to load screen")).toBeInTheDocument()
    })
})
