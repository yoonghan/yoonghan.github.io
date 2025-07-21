import Button from "@/components/Button"
import PopupKeyboard, { KeyboardKeys } from "@/components/PopupKeyboard"
import { World, GameStatus, Direction } from "snake-game/snake"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { GameContext } from "./GameContext"
import styles from "./Snake.module.css"
import { drawCell, drawSquareBoard } from "./util/drawCanvas"
import { useInterval } from "usehooks-ts"
import { reload } from "@/util/location"

export type GameProps = {
  world: World
  worldWidth: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  snakeSpeed: number
  rewardInformationCallback?: (initialRewardCellPos?: number) => void
}

type Props = GameProps & { cellSize: number }

const Game = ({
  world,
  worldWidth,
  canvas,
  ctx,
  snakeSpeed,
  cellSize,
  rewardInformationCallback,
}: Props) => {
  const gameContext = useContext(GameContext)
  const [status, setStatus] = useState<number | undefined>(undefined)
  const [points, setPoints] = useState(0)
  const [buttonText, setButtonText] = useState("Play")

  const getStatusAsText = useCallback((status: number | undefined) => {
    switch (status) {
      case GameStatus.Play:
        return "Playing"
      case GameStatus.Won:
        return "Won"
      case GameStatus.Lost:
        return "Lost"
      default:
        return "None"
    }
  }, [])

  const updateStatusAndPoints = useCallback(() => {
    const latestStatus = world.game_status()
    const latestPoints = world.points()

    if (status !== latestStatus) setStatus(latestStatus)
    if (points !== latestPoints) setPoints(latestPoints)
  }, [points, status, world])

  const drawBoard = useCallback(() => {
    drawSquareBoard(ctx, worldWidth, cellSize)
  }, [cellSize, ctx, worldWidth])

  const drawSnake = useCallback(() => {
    const snakeCells = world.snake_cells() as number[]
    snakeCells
      .filter((snakeCellIdx, i) => !(i > 0 && snakeCellIdx === snakeCells[0]))
      .forEach((snakeCellIdx, i) => {
        drawCell(
          ctx,
          snakeCellIdx,
          worldWidth,
          cellSize,
          i === 0 ? "#7878db" : "#000000",
        )
      })
  }, [cellSize, ctx, world, worldWidth])

  const drawReward = useCallback(() => {
    const idx = world.reward_cell()
    if (idx) {
      drawCell(ctx, idx, worldWidth, cellSize)
    }

    if (rewardInformationCallback) {
      rewardInformationCallback(idx)
    }
  }, [cellSize, ctx, rewardInformationCallback, world, worldWidth])

  const paint = useCallback(() => {
    drawBoard()
    drawSnake()
    drawReward()
    updateStatusAndPoints()
  }, [drawBoard, drawReward, drawSnake, updateStatusAndPoints])

  const onKeyboardClick = useCallback(
    (key: KeyboardKeys) => {
      switch (key) {
        case KeyboardKeys.UP:
          world.update_direction(Direction.UP)
          break
        case KeyboardKeys.DOWN:
          world.update_direction(Direction.DOWN)
          break
        case KeyboardKeys.LEFT:
          world.update_direction(Direction.LEFT)
          break
        case KeyboardKeys.RIGHT:
          world.update_direction(Direction.RIGHT)
          break
      }
    },
    [world],
  )

  const onPlayClicked = useCallback(() => {
    if (gameContext.isGameStarted) {
      reload()
    } else {
      if (gameContext.setGameStarted) {
        gameContext.setGameStarted(true)
        setButtonText("Playing...")
        world.play()
        updateStatusAndPoints()
      }
    }
  }, [gameContext, updateStatusAndPoints, world])

  useEffect(() => {
    canvas.width = worldWidth * cellSize
    canvas.height = worldWidth * cellSize
    paint()
  }, [canvas, cellSize, worldWidth, paint])

  const intervalDelay = useMemo(() => {
    if (status === GameStatus.Play) {
      return (snakeSpeed / 100) * 1000
    }

    return null
  }, [status, snakeSpeed])

  useInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    world.step()
    paint()
  }, intervalDelay)

  return (
    <>
      <div className={styles.contoller}>
        <div className={styles.scoreBoard}>
          <div>
            <strong>Status:</strong> <span>{getStatusAsText(status)}</span>
          </div>
          <div>
            <strong>Points:</strong> <span>{points}</span>
          </div>
        </div>
        <Button
          styling={{ small: true, inverted: false }}
          onClick={onPlayClicked}
        >
          {buttonText}
        </Button>
      </div>

      <div className={styles.keyboard}>
        <PopupKeyboard
          keyboardType="Arrows"
          onClickCallback={onKeyboardClick}
          buttonText={"Popup Keyboard"}
          enableKeyboardListener={world.game_status() !== undefined}
        />
      </div>
    </>
  )
}

export default Game
