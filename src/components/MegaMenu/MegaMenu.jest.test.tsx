import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "../../__mocks__/routerMock"
import MegaMenu from "."

describe("MegaMenu", () => {
  const waitForCommandBarToLoad = async () => {
    expect(await screen.findAllByText("walcron@tm$")).toHaveLength(2)
  }

  it("should load menu with image", async () => {
    render(<MegaMenu />)
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument()
    expect(screen.getAllByText("Projects")).toHaveLength(2)

    await waitForCommandBarToLoad()
  })

  it("should change when toggle with right, left pointer", async () => {
    const assertIsShown = async (testid: string) => {
      await waitFor(() => {
        expect(screen.getAllByTestId(testid)[0]).toHaveStyle({
          transform: "none",
        })
      })
    }

    const assertIsHidden = (testid: string) => {
      expect(screen.getAllByTestId(testid)[0]).toHaveStyle({
        transform: "scale(0)",
      })
    }

    render(<MegaMenu />)
    const leftArrow = "search 〉"
    assertIsHidden("command-menu")

    await userEvent.click(screen.getAllByRole("button", { name: leftArrow })[0])
    await assertIsShown("command-menu")

    await userEvent.click(screen.getAllByRole("button", { name: leftArrow })[0])
    await waitFor(() => {
      assertIsHidden("command-menu")
    })
  })
})
