import { ChangeEvent, useCallback, useState } from "react"
import styles from "./Snake.module.css"

export type Props = {
  disabled: boolean
  onUpdate: (info: { id: string; value: number }) => void
  formValues: {
    snakeSpeed: number
    worldDimension: number
    snakeSize: number
    cellSize: number
  }
}

const Form = ({ disabled, onUpdate, formValues }: Props) => {
  const [errorMessage, setErrorMessage] = useState("")

  const hasCheckedException = useCallback(
    (value: number, id: string) => {
      if (value > 100) {
        setErrorMessage(`${id} should be a number from 0 to 100`)
        return true
      }

      if (id === "snakeSize" && value >= formValues.worldDimension) {
        setErrorMessage(`${id} must be smaller than worldDimension`)
        return true
      }

      if (id === "worldDimension" && value <= formValues.snakeSize) {
        setErrorMessage(`${id} must be larger than snakeCell`)
        return true
      }

      setErrorMessage("")
      return false
    },
    [formValues.snakeSize, formValues.worldDimension]
  )

  const updateInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value: targetValue } = event.target
      const value = parseInt(targetValue, 10)
      if (!hasCheckedException(value, id)) {
        onUpdate({ id, value })
      }
    },
    [hasCheckedException, onUpdate]
  )

  return (
    <>
      <fieldset disabled={disabled} className={styles.configuration}>
        <legend>Configure Game Board</legend>
        <div>
          <label htmlFor="snakeSpeed">Snake Speed (sec/100):</label>
          <input
            type="number"
            max="100"
            min="1"
            onChange={updateInput}
            value={formValues.snakeSpeed}
            id="snakeSpeed"
          />
        </div>
        <div>
          <label htmlFor="worldDimension">World Dimension:</label>
          <input
            type="number"
            max="100"
            min="1"
            onChange={updateInput}
            value={formValues.worldDimension}
            id="worldDimension"
          />
        </div>
        <div>
          <label htmlFor="snakeSize">Snake Size:</label>
          <input
            type="number"
            max="100"
            min="1"
            onChange={updateInput}
            value={formValues.snakeSize}
            id="snakeSize"
          />
        </div>
        <div>
          <label htmlFor="cellSize">Cell Size:</label>
          <input
            type="number"
            max="100"
            min="1"
            onChange={updateInput}
            value={formValues.cellSize}
            id="cellSize"
          />
        </div>
      </fieldset>

      {errorMessage !== "" && (
        <div className={"alert danger"}>{errorMessage}</div>
      )}
    </>
  )
}

export default Form
