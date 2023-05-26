"use client"

import { useCallback, useEffect, useMemo } from "react"
import Popup from "reactjs-popup"
import Button from "../Button"
import styles from "./PopupKeyboard.module.css"

export enum KeyboardKeys {
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  UP = "ArrowUp",
  DOWN = "ArrowDown",
}

const arrowValues = Object.values(KeyboardKeys)

type PopupKeyboardType = {
  buttonText: string
  keyboardType: "Arrows"
  onClickCallback: (key: KeyboardKeys) => void
  enableKeyboardListener?: boolean
}

const preventKeyboardEvent = (e: Event) => {
  e.preventDefault()
  return false
}

const PopupKeyboard = ({
  buttonText,
  keyboardType,
  onClickCallback,
  enableKeyboardListener = false,
}: PopupKeyboardType) => {
  const onKeyClick = useCallback(
    (key: KeyboardKeys) => () => {
      onClickCallback(key)
    },
    [onClickCallback]
  )

  const buildKeyboardListener = useCallback(() => {
    return (event: KeyboardEvent) => {
      const direction = event.key
      switch (keyboardType) {
        case "Arrows":
          const matchedKey = arrowValues.find(
            (arrowValue) => arrowValue === direction
          )
          if (matchedKey !== undefined) {
            onKeyClick(matchedKey)()
          }
          break
      }
    }
  }, [keyboardType, onKeyClick])

  useEffect(() => {
    if (enableKeyboardListener) {
      const keyboardListener = buildKeyboardListener()
      window.addEventListener("keydown", keyboardListener)
      window.addEventListener("keydown", preventKeyboardEvent, false)
      return () => {
        window.removeEventListener("keydown", keyboardListener)
        window.removeEventListener("keydown", preventKeyboardEvent, false)
      }
    }
  }, [enableKeyboardListener, buildKeyboardListener])

  const drawnKeyboard = useMemo(() => {
    switch (keyboardType) {
      case "Arrows":
        return (
          <div className={styles["arrow-BtnContainer"]}>
            <div>
              <Button
                styling={{ small: true, inverted: true }}
                onClick={onKeyClick(KeyboardKeys.UP)}
              >
                &nbsp;↑&nbsp;
              </Button>
            </div>
            <div>
              <div>
                <Button
                  styling={{ small: true, inverted: true }}
                  onClick={onKeyClick(KeyboardKeys.LEFT)}
                >
                  ←
                </Button>
              </div>
              <div>
                <Button
                  styling={{ small: true, inverted: true }}
                  onClick={onKeyClick(KeyboardKeys.DOWN)}
                >
                  &nbsp;↓&nbsp;
                </Button>
              </div>
              <div>
                <Button
                  styling={{ small: true, inverted: true }}
                  onClick={onKeyClick(KeyboardKeys.RIGHT)}
                >
                  →
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }, [keyboardType, onKeyClick])

  return (
    <Popup
      trigger={
        <button type="button" className={styles.popupBtn}>
          {buttonText}
        </button>
      }
      position={["right center"]}
      closeOnDocumentClick={false}
    >
      {drawnKeyboard}
    </Popup>
  )
}

export default PopupKeyboard
