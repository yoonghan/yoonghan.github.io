import styles from "./Snake.module.css"
import { InitOutput, World } from "snake-game"
import { useDeferredValue, useEffect, useRef, useState } from "react"
import Game, { GameProps } from "./Game"

type Props = {
  wasm: InitOutput
  worldDimension: number
  snakePos: number
  snakeSize: number
  cellSize: number
}

const Board = ({
  wasm,
  worldDimension,
  snakePos,
  snakeSize,
  cellSize,
}: Props) => {
  const boardRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<GameProps | null>(null)
  const deferredGame = useDeferredValue(game)

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
      })
    }
  }, [boardRef, snakePos, snakeSize, worldDimension])

  return (
    <div className={styles.container}>
      {deferredGame !== null && (
        <Game {...deferredGame} cellSize={cellSize} wasm={wasm} />
      )}
      <div className={styles.gameBoard}>
        <canvas ref={boardRef}></canvas>
      </div>
    </div>
  )
}

export default Board
