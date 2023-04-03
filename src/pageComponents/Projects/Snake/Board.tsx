import styles from "./Snake.module.css"
import { InitOutput, World } from "snake-game/snake"
import { useEffect, useRef, useState } from "react"
import Game, { GameProps } from "./Game"

type Props = {
  wasm: InitOutput
  worldDimension: number
  snakePos: number
  snakeSize: number
  snakeSpeed: number
  cellSize: number
}

const Board = ({
  wasm,
  worldDimension,
  snakePos,
  snakeSize,
  snakeSpeed,
  cellSize,
}: Props) => {
  const boardRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<GameProps | null>(null)

  useEffect(() => {
    const canvas = boardRef.current
    if (canvas !== null) {
      const world = World.new(worldDimension, snakePos, snakeSize)
      const worldWidth = world.width()
      const ctx = canvas.getContext("2d")!!
      setGame({
        world,
        worldWidth,
        canvas,
        ctx,
        snakeSpeed,
      })
    }
  }, [boardRef, snakePos, snakeSize, snakeSpeed, worldDimension])

  return (
    <div className={styles.container}>
      {game !== null && <Game {...game} cellSize={cellSize} wasm={wasm} />}
      <div className={styles.gameBoard}>
        <canvas ref={boardRef}></canvas>
      </div>
    </div>
  )
}

export default Board
