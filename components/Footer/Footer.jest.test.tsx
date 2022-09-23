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
    expect(screen.getByText(footerMessage)).toHaveStyle({
      position: "absolute",
      bottom: 0,
    })
  })

  it("should render a footer that supports relative style", () => {
    render(<Footer isRelative={true} />)
    expect(screen.getByText(footerMessage)).toHaveStyle({
      position: "relative",
    })
  })
})
