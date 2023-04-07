import { createContext } from "react"

export const GameContext = createContext<{
  isGameStarted?: boolean
  setGameStarted?: (isStarted: boolean) => void
}>({})
