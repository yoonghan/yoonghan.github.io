import { render, screen, waitFor } from "@testing-library/react"
import SearchBar from "."
import { userEvent } from "@testing-library/user-event"
import "@/__tests__/mocks/routerMock"

describe("SearchBar", () => {
  it("should change when toggle with right, left pointer", async () => {
    const assertIsShown = async (testid: string) => {
      await waitFor(
        () => {
          expect(screen.getAllByTestId(testid)[0]).toHaveStyle({
            transform: "none",
          })
        },
        { interval: 200 }
      )
    }

    const assertIsHidden = (testid: string) => {
      expect(screen.getAllByTestId(testid)[0]).toHaveStyle({
        transform: "scale(0)",
      })
    }

    render(<SearchBar />)
    const searchButton = screen.getAllByRole("button", {
      name: "search",
    })[0]
    assertIsHidden("command-menu")

    await userEvent.click(searchButton)
    await assertIsShown("command-menu")

    await userEvent.click(searchButton)
    await waitFor(
      () => {
        assertIsHidden("command-menu")
      },
      { interval: 200 }
    )
  })
})
