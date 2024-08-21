import { site } from "@/config/site"
import SnakeGame from "./Snake/SnakeGame"

export const metadata = {
  title: "Snake Game",
  description: "A nokia like snake game.",
  alternates: {
    ...site.generateCanonical("/projects/game-snake"),
  },
}

const GameSnake = () => {
  return (
    <>
      <div className="page-aligned-container">
        <h1>Snake Game</h1>
        <SnakeGame />
      </div>
    </>
  )
}

export default GameSnake
