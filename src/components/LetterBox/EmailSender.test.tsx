import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { spyRedirect } from "@/__tests__/mocks/locationMock"
import EmailSender from "./EmailSender"

describe("EmailSender", () => {
	it("should render email messagebox in a dialog", async () => {
		render(
			<EmailSender
				writeFrom="Recipient"
				writeTo="Sender"
				onCancel={vi.fn()}
			/>,
		)
		expect(
			screen.getByText(
				"Apologies that we do require you to use your own mailbox",
			),
		).toBeInTheDocument()

		await userEvent.click(screen.getByRole("dialog"))
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
	})

	it("should create an HTML email", () => {
		const expectedBody = "Hello there, "
		const sender = "Sender"
		render(
			<EmailSender
				writeFrom="Enc0&dRecX"
				writeTo={sender}
				onCancel={vi.fn()}
			/>,
		)

		expect(spyRedirect).toHaveBeenCalledWith(
			`mailto:${sender}?subject=Contact%20from%20Enc0%26dRecX%20website&body=${expectedBody}`,
		)
	})
})