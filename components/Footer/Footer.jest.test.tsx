import { render, screen } from "@testing-library/react"
import Footer from "."

describe("Footer", () => {
  const currentYear = new Date().getFullYear()

  //Purposely set this in test case to fail!!
  const footerMessage = `Walcron 2014-${currentYear} ©`

  it("should check that we are in the latest year!", () => {
    expect(currentYear).toEqual(2022)
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
})
