import { render, screen, within } from "@testing-library/react"
import Footer from "."

describe("Footer", () => {
  const currentYear = new Date().getFullYear()

  it("should check that we are in the latest year!", () => {
    render(<Footer />)
    const footerMessage = `Walcron 2014-${currentYear} ©`
    expect(screen.getByText(footerMessage)).toBeInTheDocument()
  })

  it("should render with additional classname if passed", () => {
    render(<Footer className={"sampleClass"} />)
    expect(screen.getByRole("contentinfo")).toHaveClass("sampleClass")
  })

  it("should render without 'undefined' value if className is not overridden", () => {
    render(<Footer />)
    expect(screen.getByRole("contentinfo")).not.toHaveClass("undefined")
  })

  it("should contain links for sitemap and privacy", () => {
    render(<Footer />)
    expect(screen.getByText("Privacy")).toBeInTheDocument()
    expect(screen.getByText("Site Map")).toBeInTheDocument()
    expect(screen.getByText("Site Map")).toHaveAttribute("href", "/sitemap")
  })

  it("should contain for main sites", () => {
    render(<Footer />)
    expect(screen.getByText("Learn")).toBeInTheDocument()
    expect(screen.getByText("Projects")).toBeInTheDocument()
  })

  it("should group Projects correctly", () => {
    render(<Footer />)
    const projectMenuItem = screen.getByLabelText("Projects")
    expect(within(projectMenuItem).getByText("All")).toBeInTheDocument
    expect(within(projectMenuItem).getByText("Microfrontend")).toBeInTheDocument
    expect(within(projectMenuItem).queryByText("Home")).not.toBeInTheDocument
  })

  it("should group Experiments correctly", () => {
    render(<Footer />)
    const projectMenuItem = screen.getByLabelText("Experiments")
    expect(within(projectMenuItem).getByText("Accelerated Mobile Pages"))
      .toBeInTheDocument
    expect(within(projectMenuItem).queryByText("Home")).not.toBeInTheDocument
  })

  it("should group Learn correctly", () => {
    render(<Footer />)
    const projectMenuItem = screen.getByLabelText("Learn")
    expect(within(projectMenuItem).getByText("Home")).toBeInTheDocument
    expect(within(projectMenuItem).queryByText("Lessons")).not.toBeInTheDocument
    expect(within(projectMenuItem).queryByText("Accelerated Mobile Pages")).not
      .toBeInTheDocument
  })
})
