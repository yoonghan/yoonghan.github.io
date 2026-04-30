import "@/__tests__/mocks/fetchMock"
import { render, screen } from "@testing-library/react"
import { fetchMock } from "@/__tests__/mocks/fetchMock"
import { maxDuration, metadata } from "./page"

describe("Azure Integration", () => {
	beforeEach(() => {
		vi.resetModules()
		fetchMock.mockReset()
	})

	const renderComponent = async () => {
		const { default: AzureIntegration } = await import("./page")
		render(<AzureIntegration />)
	}

	it("should render correctly and bypass NextJS fetch cache", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			text: () => Promise.resolve("ready"),
		})

		await renderComponent()

		// Assert that we bypassed Next.js cache
		expect(fetchMock).toHaveBeenCalledWith(
			"https://azure.walcron.com/healthz",
			{ cache: "no-store" },
		)

		expect(
			screen.getByRole("heading", {
				name: "Azure Integration for TODO List",
			}),
		).toBeInTheDocument()
		expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
		expect(
			await screen.findByTestId("azure-integration"),
		).toBeInTheDocument()
		expect(screen.getByTestId("azure-integration")).toHaveAttribute(
			"src",
			"https://azure.walcron.com",
		)
		expect(
			screen.queryByText("Warming Up Container"),
		).not.toBeInTheDocument()
	})

	it("should display error message on failed response", async () => {
		fetchMock.mockResolvedValue({
			ok: false,
			status: 404,
		})

		await renderComponent()
		expect(
			screen.getByRole("heading", {
				name: "Azure Integration for TODO List",
			}),
		).toBeInTheDocument()
		expect(screen.getByText("Warming Up Container")).toBeInTheDocument()
		expect(
			await screen.findByText("Unable to load screen"),
		).toBeInTheDocument()
	})

	it("should timeout only after 60 minutes for Azure Container to warm up", () => {
		expect(maxDuration).toBe(60)
	})

	it("should render the right metaData", () => {
		expect(metadata).toEqual({
			title: "Azure Integration",
			description: "Integration with Azure as test bed.",
			alternates: {},
		})
	})
})