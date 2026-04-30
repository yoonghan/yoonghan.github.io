import { render, screen, waitFor } from "@testing-library/react"
import Validator from "./page"
import userEvent from "@testing-library/user-event"

describe("Validator Page", () => {
    it("should render the validator page and handle count increments", async () => {
        render(<Validator />)

        expect(screen.getByText("Validator")).toBeInTheDocument()
        expect(screen.getByText("This page is hidden to validate React Compiler is enabled.")).toBeInTheDocument()

        // Wait for the client-side effect to run
        const button = screen.getByRole("button")
        await waitFor(() => {
            // In Jest (No Compiler), it will be 0 - 1 after the initial effect re-render
            expect(button.textContent).toEqual("0 - 1")
        })

        await userEvent.click(button)
        expect(button.textContent).toEqual("1 - 2")

        await userEvent.click(button)
        expect(button.textContent).toEqual("2 - 3")
    })
})