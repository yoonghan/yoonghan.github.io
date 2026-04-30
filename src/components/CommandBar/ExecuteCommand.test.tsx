import { render, screen } from "@testing-library/react"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { spyRedirect } from "@/__tests__/mocks/locationMock"
import { exec } from "./ExecuteCommand"

describe("CommandBar", () => {
	let routeCallback: vi.Mock<any, any>
	let routeBackCallback: vi.Mock<any, any>
	let specialInputCallback: vi.Mock<any, any>

	const createCommandBar = (
		routeLocation: string | undefined | null = "/samplePage",
	) => {
		routeCallback = vi.fn()
		routeBackCallback = vi.fn()
		const globalAny = global
		const divElement = globalAny.document.createElement("div")
		const cancelCallback = vi.fn()
		const route = {
			push: routeCallback,
			back: routeBackCallback,
		} as unknown as AppRouterInstance
		specialInputCallback = vi.fn()
		return exec(
			divElement,
			cancelCallback,
			route,
			routeLocation,
			specialInputCallback,
		)
	}

	it("should return nothing if command is empty", () => {
		expect(createCommandBar()("")).toBeUndefined()
	})

	describe("Invalid Input", () => {
		it("should inform me of invalid input and direct to help", () => {
			render(<div>{createCommandBar()("I am not a valid input")}</div>)
			expect(
				screen.getByText("I am... - not found. type HELP."),
			).toBeInTheDocument()
		})
	})

	describe("Math", () => {
		it("can count 1 plus 1", () => {
			render(<div>{createCommandBar()("=1+1")}</div>)
			expect(screen.getByText("Output: 2")).toBeInTheDocument()
		})

		it("can solve complex arithmetic", () => {
			render(<div>{createCommandBar()("=1+1*2 + 7/2 - 3")}</div>)
			expect(screen.getByText("Output: 3.5")).toBeInTheDocument()
		})

		it("knows it is non-math", () => {
			render(<div>{createCommandBar()("=1+A+2")}</div>)
			expect(
				screen.getByText("Msg: Unable to evaluate."),
			).toBeInTheDocument()
		})

		it("can provide instruction", () => {
			render(<div>{createCommandBar()("=")}</div>)
			expect(
				screen.getByText("Msg: Provide an equation"),
			).toBeInTheDocument()
		})
	})

	describe("whoami", () => {
		it("should return who i am", () => {
			render(<div>{createCommandBar()("whoami")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/about")
		})

		it("should return who i am with sudo", () => {
			render(<div>{createCommandBar()("su - walcron")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/about")
		})

		it("should return error if current page is about", () => {
			render(<div>{createCommandBar("/about")("su - walcron")}</div>)
			expect(routeCallback).not.toHaveBeenLastCalledWith()
			expect(
				screen.getByText("Msg: This is the page"),
			).toBeInTheDocument()
		})
	})

	describe("history", () => {
		it("should return history", () => {
			render(<div>{createCommandBar()("history")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/history")
		})

		it("should return history", () => {
			render(<div>{createCommandBar()("cd history")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/history")
		})

		it("should return error if current page is history", () => {
			render(<div>{createCommandBar("/history")("cd /history")}</div>)
			expect(routeCallback).not.toHaveBeenLastCalledWith()
			expect(
				screen.getByText("Msg: This is the page"),
			).toBeInTheDocument()
		})
	})

	describe("pwd", () => {
		it("should return current url", () => {
			render(<div>{createCommandBar()("pwd")}</div>)
			expect(routeCallback).not.toHaveBeenCalled()
			expect(screen.getByText("Output: /samplePage")).toBeInTheDocument()
		})

		it("should return root if pathname detected is null", () => {
			render(<div>{createCommandBar(null)("pwd")}</div>)
			expect(routeCallback).not.toHaveBeenCalled()
			expect(screen.getByText("Output: /")).toBeInTheDocument()
		})
	})

	describe("ls", () => {
		it("should return projects page", () => {
			render(<div>{createCommandBar()("ls")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/projects")
		})

		it("should return error if current page is projects", () => {
			render(<div>{createCommandBar("/projects")("ls")}</div>)
			expect(routeCallback).not.toHaveBeenLastCalledWith()
			expect(
				screen.getByText("Msg: This is the page"),
			).toBeInTheDocument()
		})
	})

	describe("main", () => {
		it("should return to main when exit is keyed", () => {
			render(<div>{createCommandBar()("exit")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/")
		})

		it("should inform it's invalid to exit on a main page", () => {
			render(<div>{createCommandBar("/")("exit")}</div>)
			expect(routeCallback).not.toHaveBeenCalled()
			expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
		})

		it("should inform it's invalid to exit on a main page", () => {
			render(<div>{createCommandBar("/")("exit")}</div>)
			expect(routeCallback).not.toHaveBeenCalled()
			expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
		})

		it("should work with matching synonym", () => {
			render(<div>{createCommandBar()("cd /")}</div>)
			expect(routeCallback).toHaveBeenLastCalledWith("/")
		})
	})

	describe("cd ..", () => {
		it("should return to previous page", () => {
			render(<div>{createCommandBar()("cd ..")}</div>)
			expect(routeBackCallback).toHaveBeenCalled()
			expect(routeCallback).not.toHaveBeenCalled()
		})

		it("should inform it's invalid to exit on a main page", () => {
			render(<div>{createCommandBar("/")("cd ..")}</div>)
			expect(routeCallback).not.toHaveBeenCalled()
			expect(screen.getByText("Msg: Already at root")).toBeInTheDocument()
		})
	})

	describe("share", () => {
		it("should attach share", () => {
			render(<div>{createCommandBar()("share")}</div>)
			expect(
				screen.getByText("Msg: Couldn't run HTML5 share."),
			).toBeInTheDocument()
		})

		it("should attach share", () => {
			const sharedCallback = vi.fn()
			window.navigator.share = sharedCallback
			render(<div>{createCommandBar()("share")}</div>)
			expect(sharedCallback).toHaveBeenCalledWith({
				title: "Walcron",
				text: "An awesome website.",
				url: "https://www.walcron.com",
			})
		})
	})

	describe("help", () => {
		it("should show help", () => {
			render(<div>{createCommandBar()("help")}</div>)
			expect(screen.getByText("Help")).toBeInTheDocument()
		})

		it("should show help non case sensitive", () => {
			render(<div>{createCommandBar()("hElP")}</div>)
			expect(screen.getByText("Help")).toBeInTheDocument()
		})

		it("should show help with whitespace", () => {
			render(<div>{createCommandBar()("help    ")}</div>)
			expect(screen.getByText("Help")).toBeInTheDocument()
		})
	})

	describe("no-animate", () => {
		it("should update location with no-animate", () => {
			render(<div>{createCommandBar()("no-animate")}</div>)
			expect(spyRedirect).toHaveBeenCalledWith("/samplePage?animate=none")
		})
	})
})