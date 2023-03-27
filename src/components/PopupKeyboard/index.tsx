import { useCallback, useMemo } from "react"
import Popup from "reactjs-popup"
import Button from "../Button"
import styles from "./PopupKeyboard.module.css"

export enum KeyboardKeys {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

type PopupKeyboardType = {
  buttonText: string
  keyboardType: "Arrows"
  onClickCallback: (key: KeyboardKeys) => void
}

const PopupKeyboard = ({
  buttonText,
  keyboardType,
  onClickCallback,
}: PopupKeyboardType) => {
  const onKeyClick = useCallback(
    (key: KeyboardKeys) => () => {
      onClickCallback(key)
    },
    [onClickCallback]
  )

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
    >
      {drawnKeyboard}
    </Popup>
  )
}

export default PopupKeyboard
