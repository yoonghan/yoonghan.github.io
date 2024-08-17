"use client"

import PopupKeyboard from "@/components/PopupKeyboard"

const emptyFn = () => {}

export const ArrowKeyboard = () => (
  <PopupKeyboard
    keyboardType="Arrows"
    onClickCallback={emptyFn}
    buttonText={"Show Me"}
  />
)
