import "@/__tests__/mocks/routerMock"
import { render, screen } from "@testing-library/react"
import CommandBar from "."

describe("CommandBar", () => {
  it("should render normally", async () => {
    render(<CommandBar />)
    expect(screen.getByText("Loading Shell command...")).toBeInTheDocument()
    expect(await screen.findByText("walcron@tm$")).toBeInTheDocument()
    expect(screen.getByText("Site Map:")).toBeInTheDocument()
  })

  it("should render without command prompt", () => {
    render(<CommandBar commandPromptOnly={true} />)
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
    expect(screen.queryByText("Site Map:")).not.toBeInTheDocument()
  })
})
