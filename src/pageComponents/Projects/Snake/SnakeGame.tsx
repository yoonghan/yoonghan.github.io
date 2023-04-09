import { useCallback, useEffect, useState } from "react"
import init from "snake-game/snake"
import { rnd } from "@/util/random"
import Board from "./Board"
import { GameContext } from "./GameContext"
import styles from "./Snake.module.css"
import Form from "./Form"

const WORLD_DIMENSION = 15
const SNAKE_POS = rnd(WORLD_DIMENSION * WORLD_DIMENSION)
const SNAKE_SIZE = 10
const CELL_SIZE = 20
const SPEED = 10

const SnakeGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [worldDimension, setWorldDimension] = useState(WORLD_DIMENSION)
  const [snakeSpeed, setSnakeSpeed] = useState(SPEED)
  const [snakeSize, setSnakeSize] = useState(SNAKE_SIZE)
  const [cellSize, setCellSize] = useState(CELL_SIZE)
  const [wasmLoaded, setWasmLoaded] = useState(false)

  useEffect(() => {
    init().then(() => {
      setWasmLoaded(true)
    })
  }, [])

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
        {wasmLoaded && (
          <Board
            worldDimension={worldDimension}
            snakePos={SNAKE_POS}
            snakeSize={snakeSize}
            snakeSpeed={snakeSpeed}
            cellSize={cellSize}
          />
        )}
      </div>
    </GameContext.Provider>
  )
}

export default SnakeGame
