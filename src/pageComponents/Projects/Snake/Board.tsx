import styles from "./Snake.module.css"
import init, { World } from "snake-game/snake"
import { Suspense, useEffect, useRef, useState } from "react"
import Game, { GameProps } from "./Game"
import wrapPromise from "@/components/utils/common/wrapPromise"

type Props = {
  worldDimension: number
  snakePos: number
  snakeSize: number
  snakeSpeed: number
  cellSize: number
  rewardInformationCallback?: (initialRewardCellPos?: number) => void
  startRewardCell?: number
}

const wasmLoader = wrapPromise(init())

const SuspendedBoard = (props: Props) => {
  wasmLoader.read()
  return (
    <Suspense fallback={<div style={{ color: "green" }}>Loading Board</div>}>
      <Board {...props} />
    </Suspense>
  )
}

const Board = ({
  worldDimension,
  snakePos,
  snakeSize,
  snakeSpeed,
  cellSize,
  rewardInformationCallback,
  startRewardCell,
}: Props) => {
  const boardRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<GameProps | null>(null)

  useEffect(() => {
    const canvas = boardRef.current
    if (canvas !== null) {
      const world = World.new(
        worldDimension,
        snakePos,
        snakeSize,
        startRewardCell
      )
      const worldWidth = world.width()
      const ctx = canvas.getContext("2d")!!
      setGame({
        world,
        worldWidth,
        canvas,
        ctx,
        snakeSpeed,
      })
    }
  }, [
    boardRef,
    snakePos,
    snakeSize,
    snakeSpeed,
    startRewardCell,
    worldDimension,
  ])

  return (
    <div className={styles.container}>
      {game !== null && (
        <Game
          {...game}
          cellSize={cellSize}
          rewardInformationCallback={rewardInformationCallback}
        />
      )}
      <div className={styles.gameBoard}>
        <canvas ref={boardRef}></canvas>
      </div>
    </div>
  )
}

export default SuspendedBoard
