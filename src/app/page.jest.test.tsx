import { render, screen } from "@testing-library/react"
import Index from "./page"

describe("main page", () => {
    it("should render main page", () => {
        render(<Index/>)
        expect(screen.getByRole("heading", { name: "PORTFOLIO PORTAL" })).toBeInTheDocument()
    })
})