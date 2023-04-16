import { useCallback, useState, Suspense } from "react"
import { rnd } from "@/util/random"
import { GameContext } from "./GameContext"
import styles from "./Snake.module.css"
import Form from "./Form"
import dynamic from "next/dynamic"

const WORLD_DIMENSION = 15
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

  const calcSnakePos = useCallback(
    (dimension: number) => rnd(dimension * dimension),
    []
  )

  const [snakePos, setSnakePos] = useState(calcSnakePos(WORLD_DIMENSION))

  const updateForm = useCallback(
    ({ id, value }: { id: string; value: number }) => {
      setForm((form) => ({
        ...form,
        [id]: value,
      }))
      if (id === "worldDimension") {
        setSnakePos(rnd(form.worldDimension))
      }
    },
    [form.worldDimension]
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
            snakePos={snakePos}
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
