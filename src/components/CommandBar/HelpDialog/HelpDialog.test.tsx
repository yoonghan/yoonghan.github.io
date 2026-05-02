import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AvailableInput } from "../CommandSearch/CommandSearch"
import HelpDialog from "."

describe("HelpDialog", () => {
	it("should render help dialog correctly", () => {
		render(
			<HelpDialog
				onCancel={vi.fn()}
				specialInputCallback={vi.fn()}
			/>,
		)
		expect(screen.getByText("Help")).toBeInTheDocument()
	})

	it("should trigger cancel on close", async () => {
		const cancelFn = vi.fn()
		render(
			<HelpDialog onCancel={cancelFn} specialInputCallback={vi.fn()} />,
		)

		await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
		expect(cancelFn).toHaveBeenCalled()
	})

	it("should trigger cancel and special command if one of the input was clicked", async () => {
		const cancelFn = vi.fn()
		const specialInputFn = vi.fn()
		render(
			<HelpDialog
				onCancel={cancelFn}
				specialInputCallback={specialInputFn}
			/>,
		)

		const oneOfTheInput = AvailableInput.pwd.description
		await userEvent.click(screen.getByText(oneOfTheInput))
		expect(cancelFn).toHaveBeenCalled()
		expect(specialInputFn).toHaveBeenCalled()
	})
})