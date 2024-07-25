import { KeyboardKeys } from "@/components/PopupKeyboard"
import { act, render, screen } from "@testing-library/react"
import testLibUserEvent from "@testing-library/user-event"
import { spyOnReload } from "../../../../__mocks__/windowMock"
import "../../../../__mocks__/snakeWasmMock"
import Board from "./Board"
import { GameContext } from "./GameContext"

describe("Board", () => {
  let userEvent = testLibUserEvent

  it("should render screen with a start button", async () => {
    render(
      <Board
        worldDimension={2}
        snakePos={0}
        snakeSize={2}
        snakeSpeed={100}
        cellSize={10}
      />
    )
    expect(
      await screen.findByRole("button", { name: "Play" })
    ).toBeInTheDocument()
  })

  describe("being played", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      userEvent = testLibUserEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      }) as any
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    const renderComponent = async (isGameStarted = false) => {
      let rewardInfo: undefined | { initialRewardCellPos?: number }
      const rewardInformationCallback = (initialRewardCellPos?: number) => {
        rewardInfo = {
          initialRewardCellPos,
        }
      }
      render(
        <GameContext.Provider
          value={{
            isGameStarted,
            setGameStarted: (_: boolean) => {},
          }}
        >
          <Board
            worldDimension={2}
            snakePos={0}
            snakeSize={2}
            snakeSpeed={100}
            cellSize={10}
            rewardInformationCallback={rewardInformationCallback}
            startRewardCell={3}
          />
        </GameContext.Provider>
      )
      expect(
        await screen.findByRole("button", { name: "Play" })
      ).toBeInTheDocument()
      return { rewardInfo }
    }

    it("should render reload on Play of game if game is start", async () => {
      const reloadFn = spyOnReload()
      await renderComponent(true)

      await userEvent.click(await screen.findByRole("button", { name: "Play" }))

      expect(reloadFn).toHaveBeenCalled()
    })

    it("should be able to play the game and move to Lost after play", async () => {
      await renderComponent()
      await userEvent.click(screen.getByRole("button", { name: "Play" }))
      expect(
        await screen.findByRole("button", { name: "Playing..." })
      ).toBeInTheDocument()
      expect(await screen.findByText("Playing")).toBeInTheDocument()
      jest.advanceTimersByTime(1000)
      await userEvent.keyboard(`{${KeyboardKeys.DOWN}}`)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(await screen.findByText("1")).toBeInTheDocument()
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(await screen.findByText("Lost")).toBeInTheDocument()
    })

    it("should be able to Win the game play", async () => {
      await renderComponent()
      await userEvent.click(screen.getByRole("button", { name: "Play" }))
      expect(
        await screen.findByRole("button", { name: "Playing..." })
      ).toBeInTheDocument()
      expect(await screen.findByText("Playing")).toBeInTheDocument()
      jest.advanceTimersByTime(1000)
      await userEvent.keyboard(`{${KeyboardKeys.DOWN}}`)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(await screen.findByText("1")).toBeInTheDocument()
      await userEvent.keyboard(`{${KeyboardKeys.LEFT}}`)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      if (screen.queryByText("2")) {
        //win if reward spawns on cell = 2
        expect(await screen.findByText("Won")).toBeInTheDocument()
      } else {
        //reward spawns on cell = 0
        await userEvent.keyboard(`{${KeyboardKeys.UP}}`)
        act(() => {
          jest.advanceTimersByTime(1000)
        })

        expect(await screen.findByText("Won")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
      }
    })

    it("should be able to Win the game play with Right direction", async () => {
      await renderComponent()
      await userEvent.click(screen.getByRole("button", { name: "Play" }))
      expect(
        await screen.findByRole("button", { name: "Playing..." })
      ).toBeInTheDocument()
      expect(await screen.findByText("Playing")).toBeInTheDocument()
      jest.advanceTimersByTime(1000)
      await userEvent.keyboard(`{${KeyboardKeys.DOWN}}`)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(await screen.findByText("1")).toBeInTheDocument()
      await userEvent.keyboard(`{${KeyboardKeys.RIGHT}}`)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      if (screen.queryByText("2")) {
        //win if reward spawns on cell = 2
        expect(await screen.findByText("Won")).toBeInTheDocument()
      } else {
        //reward spawns on cell = 0
        await userEvent.keyboard(`{${KeyboardKeys.UP}}`)
        act(() => {
          jest.advanceTimersByTime(1000)
        })

        expect(await screen.findByText("Won")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
      }
    })
  })
})
