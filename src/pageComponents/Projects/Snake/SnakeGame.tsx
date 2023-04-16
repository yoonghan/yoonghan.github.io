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
const SNAKE_SPEED = 10

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
  const [form, setForm] = useState({
    worldDimension: WORLD_DIMENSION,
    snakeSpeed: SNAKE_SPEED,
    snakeSize: SNAKE_SIZE,
    cellSize: CELL_SIZE,
  })

  const updateForm = useCallback(
    ({ id, value }: { id: string; value: number }) => {
      setForm((form) => ({
        ...form,
        [id]: value,
      }))
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
              formValues={form}
            />
          )}
        </GameContext.Consumer>
        <Suspense>
          <Board
            worldDimension={form.worldDimension}
            snakePos={SNAKE_POS}
            snakeSize={form.snakeSize}
            snakeSpeed={form.snakeSpeed}
            cellSize={form.cellSize}
          />
        </Suspense>
      </div>
    </GameContext.Provider>
  )
}

export default SnakeGame
