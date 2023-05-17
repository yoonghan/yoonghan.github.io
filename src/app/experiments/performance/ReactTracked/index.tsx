import React from "react"
import { SharedStateProvider } from "./store"
import Counter from "./Counter"
import TextBox from "./TextBox"

const ReactTracked = () => (
  <SharedStateProvider>
    <div>
      Testing react tracked, that change of 1 component does affect another.
    </div>
    <div className="App">
      <header className="App-header">
        <Counter />
        <TextBox />
        <div>Logo</div>
      </header>
    </div>
  </SharedStateProvider>
)

export default ReactTracked
