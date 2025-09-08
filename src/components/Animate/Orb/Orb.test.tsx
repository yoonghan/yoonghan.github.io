/* eslint-disable testing-library/no-node-access */
import React from "react"
import { render, screen } from "@testing-library/react"
import { spySearch } from "@/__tests__/mocks/locationMock"
import Orb from "@/components/Animate/Orb"

describe("Orb component", () => {
  it("renders the main orb container", () => {
    render(<Orb />)
    const orbElement = screen.getByTestId("siri-orb")
    expect(orbElement).toBeInTheDocument()
  })

  it("renders all four wave elements", () => {
    render(<Orb />)
    const orbElement = screen.getByTestId("siri-orb")
    expect(orbElement.children.length).toBe(4)
  })

  it("should not have animate-none class when animate param is not present", () => {
    render(<Orb />)
    const orbElement = screen.getByTestId("siri-orb")
    expect(orbElement).not.toHaveClass("noAnimation")
  })

  it("should have animate-none class when animate=none is present in query string", () => {
    spySearch.mockReturnValue("?animate=none")
    render(<Orb />)
    const orbElement = screen.getByTestId("siri-orb")
    expect(orbElement).toHaveClass("noAnimation")
    spySearch.mockClear()
  })
})
