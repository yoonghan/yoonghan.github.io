/* eslint-disable testing-library/no-node-access */
import React from "react"
import { render, screen } from "@testing-library/react"
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
})
