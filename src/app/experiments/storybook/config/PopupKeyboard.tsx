"use client"

import PopupKeyboard from "@/components/PopupKeyboard"

const emptyFn = () => {}

export const ArrowKeyboard = () => (
  <PopupKeyboard onClickCallback={emptyFn} buttonText={"Show Me"} />
)
