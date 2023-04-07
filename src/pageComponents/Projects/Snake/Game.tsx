import Button from "@/components/Button"
import PopupKeyboard, { KeyboardKeys } from "@/components/PopupKeyboard"
import { World, GameStatus, Direction } from "snake-game/snake"
import { useCallback, useContext, useEffect, useState } from "react"
import { GameContext } from "./GameContext"
import styles from "./Snake.module.css"
import { drawCell, drawSquareBoard } from "./util/drawCanvas"

export type GameProps = {
  world: World
  worldWidth: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  snakeSpeed: number
}

export type Props = GameProps & { cellSize: number }

const Game = ({
  world,
  worldWidth,
  canvas,
  ctx,
  snakeSpeed,
  cellSize,
}: Props) => {
  const gameContext = useContext(GameContext)
  const [status, setStatus] = useState("None")
  const [points, setPoints] = useState(0)
  const [buttonText, setButtonText] = useState("Play")

  const preventKeyboardEvent = (e: Event) => {
    e.preventDefault()
    return false
  }

  const getStatus = useCallback(() => {
    switch (world.game_status()) {
      case GameStatus.Play:
        return "Playing"
      case GameStatus.Won:
        return "Won"
      case GameStatus.Lost:
        return "Lost"
      default:
        return "None"
    }
  }, [world])

  const updateStatus = useCallback(() => {
    setStatus(getStatus())
  }, [getStatus])

  const updatePoints = useCallback(() => {
    setPoints(world.points())
  }, [world])

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
          i === 0 ? "#7878db" : "#000000"
        )
      })
  }, [cellSize, ctx, world, worldWidth])

  const drawReward = useCallback(() => {
    const idx = world.reward_cell()
    if (idx) {
      drawCell(ctx, idx, worldWidth, cellSize)
    }
  }, [cellSize, ctx, world, worldWidth])

  const paint = useCallback(() => {
    drawBoard()
    drawSnake()
    drawReward()
    updateStatus()
    updatePoints()
  }, [drawBoard, drawReward, drawSnake, updatePoints, updateStatus])

  const play = useCallback(() => {
    switch (world.game_status()) {
      case GameStatus.Won:
      case GameStatus.Lost:
        setButtonText("Replay")
        return
    }

    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      world.step()
      paint()
      requestAnimationFrame(play)
    }, (snakeSpeed / 100) * 1000)
  }, [canvas.height, canvas.width, ctx, paint, snakeSpeed, world])

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
    [world]
  )

  const addMovementMonitor = useCallback(() => {
    window.addEventListener("keydown", (event) => {
      const direction = event.key
      switch (direction) {
        case "ArrowUp":
          onKeyboardClick(KeyboardKeys.UP)
          break
        case "ArrowDown":
          onKeyboardClick(KeyboardKeys.DOWN)
          break
        case "ArrowLeft":
          onKeyboardClick(KeyboardKeys.LEFT)
          break
        case "ArrowRight":
          onKeyboardClick(KeyboardKeys.RIGHT)
          break
      }
    })

    window.addEventListener("keydown", preventKeyboardEvent, false)
  }, [onKeyboardClick])

  const onPlayClicked = useCallback(() => {
    if (world.game_status() !== undefined) {
      location.reload()
    } else {
      gameContext.setGameStarted(true)
      setButtonText("Playing...")
      addMovementMonitor()
      world.play()
      play()
    }
  }, [addMovementMonitor, gameContext, play, world])

  useEffect(() => {
    canvas.width = worldWidth * cellSize
    canvas.height = worldWidth * cellSize
    paint()
  }, [canvas, cellSize, worldWidth, paint])

  useEffect(() => {
    return () => {
      window.removeEventListener("keydown", preventKeyboardEvent, false)
    }
  }, [])

  return (
    <>
      <div className={styles.contoller}>
        <div className={styles.scoreBoard}>
          <div>
            <strong>Status:</strong> <span>{status}</span>
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
        />
      </div>
    </>
  )
}

export default Game
