import { useCallback, useState, useEffect, Suspense } from "react"
import { rnd } from "@/util/random"
import { GameContext } from "./GameContext"
import styles from "./Snake.module.css"
import Form from "./Form"
import dynamic from "next/dynamic"

const WORLD_DIMENSION = 15
const SNAKE_POS = rnd(WORLD_DIMENSION * WORLD_DIMENSION)
const SNAKE_SIZE = 10
const CELL_SIZE = 20
const SPEED = 10

const Board = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Game Board
    </div>
  ),
})

const SnakeGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [worldDimension, setWorldDimension] = useState(WORLD_DIMENSION)
  const [snakeSpeed, setSnakeSpeed] = useState(SPEED)
  const [snakeSize, setSnakeSize] = useState(SNAKE_SIZE)
  const [cellSize, setCellSize] = useState(CELL_SIZE)

  const updateForm = useCallback(
    ({ id, value }: { id: string; value: number }) => {
      switch (id) {
        case "worldDimension":
          setWorldDimension(value)
          break
        case "snakeSpeed":
          setSnakeSpeed(value)
          break
        case "snakeSize":
          setSnakeSize(value)
          break
        case "cellSize":
          setCellSize(value)
          break
      }
    },
    []
  )

  return (
    <GameContext.Provider value={{ isGameStarted, setGameStarted }}>
      <div className={styles.container}>
        <GameContext.Consumer>
          {({ isGameStarted }) => (
            <Form
              disabled={isGameStarted === true}
              onUpdate={updateForm}
              formValues={{ snakeSpeed, snakeSize, cellSize, worldDimension }}
            />
          )}
        </GameContext.Consumer>
        <Board
          worldDimension={worldDimension}
          snakePos={SNAKE_POS}
          snakeSize={snakeSize}
          snakeSpeed={snakeSpeed}
          cellSize={cellSize}
        />
      </div>
    </GameContext.Provider>
  )
}

export default SnakeGame
