import { render, screen } from "@testing-library/react"
import Footer from "."

describe("Footer", () => {
  const currentYear = new Date().getFullYear()

  //Purposely set this in test case to fail!!
  const footerMessage = `Walcron 2014-${currentYear} ©`

  it("should check that we are in the latest year!", () => {
    expect(currentYear).toEqual(2022)
  })

  it("should render a footer with correct footer message", () => {
    render(<Footer />)
    expect(screen.getByText(footerMessage)).toBeInTheDocument()
    expect(screen.getByText(footerMessage)).toHaveClass("relative")
  })

  it("should render a footer that supports absolute style", () => {
    render(<Footer isRelative={false} />)
    expect(screen.getByText(footerMessage)).toHaveClass("absolute")
  })

  it("should render with additional classname if passed", () => {
    render(<Footer className={"sampleClass"} />)
    expect(screen.getByText(footerMessage)).toHaveClass("sampleClass")
  })
})
