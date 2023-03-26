import { ChangeEvent, useCallback, useEffect, useState } from "react"
import init, { InitOutput } from "snake-game"
import { rnd } from "src/util/random"
import Board from "./Board"
import { GameContext } from "./Context"
import styles from "./Snake.module.css"

const WORLD_DIMENSION = 20
const SNAKE_POS = rnd(WORLD_DIMENSION * WORLD_DIMENSION)
const SNAKE_SIZE = 10
const CELL_SIZE = 20

const SnakeGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [worldDimension, setWorldDimension] = useState(WORLD_DIMENSION)
  const [snakePos, setSnakePos] = useState(SNAKE_POS)
  const [snakeSize, setSnakeSize] = useState(SNAKE_SIZE)
  const [cellSize, setCellSize] = useState(CELL_SIZE)
  const [wasm, setWasm] = useState<InitOutput>()

  useEffect(() => {
    init().then((wasm) => {
      setWasm(wasm)
    })
  }, [])

  const updateInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetName = event.target.id
      const value = parseInt(event.target.value, 10)
      if (Number.isNaN(value) || value <= 0) {
        return
      }
      switch (targetName) {
        case "worldDimension": {
          setWorldDimension(value)
          break
        }
        case "snakeSize": {
          if (value < worldDimension) {
            setSnakeSize(value)
            setSnakePos(rnd(worldDimension * worldDimension))
          }
          break
        }
        case "cellSize": {
          setCellSize(value)
          break
        }
      }
    },
    [worldDimension]
  )

  return (
    <GameContext.Provider value={{ isGameStarted, setGameStarted }}>
      <div className={styles.container}>
        <GameContext.Consumer>
          {({ isGameStarted }) => (
            <form onSubmit={() => false}>
              <fieldset
                disabled={isGameStarted}
                className={styles.configuration}
              >
                <div>
                  World Dimension:
                  <input
                    type="number"
                    onChange={updateInput}
                    value={worldDimension}
                    id="worldDimension"
                  />
                </div>
                <div>
                  Snake Size:
                  <input
                    type="number"
                    onChange={updateInput}
                    value={snakeSize}
                    id="snakeSize"
                  />
                </div>
                <div>
                  Cell Size:
                  <input
                    type="number"
                    onChange={updateInput}
                    value={cellSize}
                    id="cellSize"
                  />
                </div>
              </fieldset>
            </form>
          )}
        </GameContext.Consumer>
        {wasm && (
          <Board
            worldDimension={worldDimension}
            snakePos={snakePos}
            snakeSize={snakeSize}
            cellSize={cellSize}
            wasm={wasm}
          />
        )}
      </div>
    </GameContext.Provider>
  )
}

export default SnakeGame
