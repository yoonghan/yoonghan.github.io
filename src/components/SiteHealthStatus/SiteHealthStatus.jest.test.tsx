import { render, screen } from "@testing-library/react"
import SiteHealthStatus from "./index"

describe("SiteHealthStatus component", () => {
    it("renders the component with health status badges", () => {
        render(<SiteHealthStatus repo="yoonghan/yoonghan.github.io" codecovToken="HPWQMQPPS1" />)

        expect(screen.getByRole("heading", { name: "Site Health Status" })).toBeInTheDocument()

        // Check if badges are rendered
        expect(screen.getByAltText("Report merged result on main branch")).toBeInTheDocument()
        expect(screen.getByAltText("Code coverage")).toBeInTheDocument()
        expect(screen.getByAltText("Bugs")).toBeInTheDocument()
        expect(screen.getByAltText("Code Smells")).toBeInTheDocument()
        expect(screen.getByAltText("Vulnerabilities")).toBeInTheDocument()
        expect(screen.getByAltText("Security Rating")).toBeInTheDocument()
    })
})
