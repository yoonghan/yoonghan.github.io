import { render, screen } from "@testing-library/react"
import React from "react"
import Table from "."
import userEvent from "@testing-library/user-event"

describe("Table", () => {
  it("should render table correctly", () => {
    render(
      <Table
        headers={["headerOne", "headerTwo"]}
        list={[{ headerOne: "value1", headerTwo: <span>value2</span> }]}
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

  it("should allow row click", async () => {
    const clickFn = jest.fn()
    const firstRecord = {
      headerOne: "value1",
      headerTwo: <span>value2</span>,
    }

    render(
      <Table
        headers={["headerOne", "headerTwo"]}
        list={[firstRecord]}
        onClick={clickFn}
      />
    )
    await userEvent.click(screen.getByRole("row", { name: "value1 value2" }))
    expect(clickFn).toHaveBeenCalledWith(firstRecord)
  })

  it("should allow classname override", () => {
    render(
      <Table
        headers={["headerOne", "headerTwo"]}
        list={[{ headerOne: "value1", headerTwo: <span>value2</span> }]}
        className="sampleClass"
      />
    )
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole("table").parentElement).toHaveClass("sampleClass")
  })
})
