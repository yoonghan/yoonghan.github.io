"use client"

import PopupKeyboard from "@/components/PopupKeyboard"

const emptyFn = () => {}

const ArrowKeyboard = (
  <PopupKeyboard
    keyboardType="Arrows"
    onClickCallback={emptyFn}
    buttonText={"Show Me"}
  />
)

export default ArrowKeyboard
