import { createContext } from "react"

export const GameContext = createContext({
  isGameStarted: false,
  setGameStarted: (isStarted: boolean) => {},
})
