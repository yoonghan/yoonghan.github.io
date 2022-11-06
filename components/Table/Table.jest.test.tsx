import { render, screen } from "@testing-library/react"
import React from "react"
import Table from "."

describe("Table", () => {
  it("should render table correctly", () => {
    render(
      <Table
        headers={["headerOne", "headerTwo"]}
        list={[{ headerOne: "value1", headerTwo: "value2" }]}
      />
    )
    expect(
      screen.getByRole("columnheader", { name: "headerOne" })
    ).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "value2" })).toBeInTheDocument()
    expect(
      screen.getByRole("row", { name: "headerOne headerTwo" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("row", { name: "value1 value2" })
    ).toBeInTheDocument()
  })
})
