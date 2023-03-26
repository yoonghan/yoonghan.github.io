import Button from "@/components/Button"
import { InitOutput, World, GameStatus, Direction } from "pkg/snake"
import { useCallback, useContext, useEffect, useState } from "react"
import { GameContext } from "./Context"
import styles from "./Snake.module.css"

export type GameProps = {
  world: World
  worldWidth: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

export type Props = GameProps & { wasm: InitOutput; cellSize: number }

const Game = ({ wasm, world, worldWidth, canvas, ctx, cellSize }: Props) => {
  const gameContext = useContext(GameContext)
  const [status, setStatus] = useState("None")
  const [points, setPoints] = useState(0)
  const [buttonText, setButtonText] = useState("Play")

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
    ctx.beginPath()

    for (let x = 0; x <= worldWidth; x++) {
      ctx.moveTo(x * cellSize, 0)
      ctx.lineTo(x * cellSize, worldWidth * cellSize)
    }

    for (let y = 0; y <= worldWidth; y++) {
      ctx.moveTo(0, y * cellSize)
      ctx.lineTo(worldWidth * cellSize, y * cellSize)
    }

    ctx.stroke()
  }, [cellSize, ctx, worldWidth])

  const drawSnake = useCallback(() => {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      world.snake_cells(),
      world.snake_body_length()
    )

    snakeCells
      .filter((snakeCellIdx, i) => !(i > 0 && snakeCellIdx === snakeCells[0]))
      .forEach((snakeCellIdx, i) => {
        const col = snakeCellIdx % worldWidth
        const row = Math.floor(snakeCellIdx / worldWidth)
        ctx.fillStyle = i === 0 ? "#7878db" : "#000000"
        ctx.beginPath()
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
        ctx.stroke()
      })
  }, [cellSize, ctx, wasm.memory.buffer, world, worldWidth])

  const drawReward = useCallback(() => {
    const idx = world.reward_cell()
    if (idx) {
      const col = idx % worldWidth
      const row = Math.floor(idx / worldWidth)

      ctx.fillStyle = "#ff0000"

      ctx.beginPath()

      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)

      ctx.stroke()
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
    }, 400)
  }, [canvas.height, canvas.width, ctx, paint, world])

  const addMovementMonitor = useCallback(() => {
    window.addEventListener("keydown", (event) => {
      const direction = event.key
      switch (direction) {
        case "ArrowUp":
          world.update_direction(Direction.UP)
          break
        case "ArrowDown":
          world.update_direction(Direction.DOWN)
          break
        case "ArrowLeft":
          world.update_direction(Direction.LEFT)
          break
        case "ArrowRight":
          world.update_direction(Direction.RIGHT)
          break
      }
    })

    window.addEventListener(
      "keydown",
      (e) => {
        e.preventDefault()
        return false
      },
      false
    )
  }, [world])

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
  }, [play, world])

  useEffect(() => {
    canvas.width = worldWidth * cellSize
    canvas.height = worldWidth * cellSize
    paint()
  }, [canvas, cellSize, worldWidth, paint, addMovementMonitor])

  return (
    <div className={styles.scoreBoard}>
      <div>
        Status: <span>{status}</span>
      </div>
      <div>
        Points: <span>{points}</span>
      </div>
      <Button
        styling={{ small: true, inverted: false }}
        onClick={onPlayClicked}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default Game
