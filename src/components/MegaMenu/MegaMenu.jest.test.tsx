import { render, screen } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import MegaMenu from "."

describe("MegaMenu", () => {
  const waitForCommandBarToLoad = async () => {
    expect(await screen.findAllByText("walcron$")).toHaveLength(2)
  }

  it("should load menu with image", async () => {
    render(<MegaMenu />)
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(screen.getAllByText("Projects")).toHaveLength(2)

    await waitForCommandBarToLoad()
  })
})
