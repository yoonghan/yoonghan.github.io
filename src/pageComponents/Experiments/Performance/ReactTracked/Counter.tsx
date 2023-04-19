import React from "react"

import { useSharedState } from "./store"

const Counter = () => {
  const [state, setState] = useSharedState()
  const increment = () => {
    setState((prev) => ({ ...prev, count: (prev["count"] as number) + 1 }))
  }
  return (
    <div>
      {state["count"]}
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default Counter
