import { render, screen } from "@testing-library/react"
import { setEnv } from "@/__tests__/mocks/setEnv"
import { metadata } from "../page"
import Messenger from "./page"

describe("Messenger", () => {
	it("should show warning if none of the environment is set", () => {
		setEnv({
			NEXT_PUBLIC_PUSHER_APP_KEY: undefined,
			NEXT_PUBLIC_PUSHER_CLUSTER: undefined,
		})
		render(<Messenger />)
		expect(
			screen.getByText(
				"Pusher initialization failed due to missing environment variable.",
			),
		).toBeInTheDocument()
	})

	it("should render the right metaData", () => {
		expect(metadata.alternates).toEqual({})
	})
})