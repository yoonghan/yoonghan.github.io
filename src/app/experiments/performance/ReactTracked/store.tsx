import React, { ReactNode, createContext, useState, useContext } from "react"
import { createContainer } from "react-tracked"

// const initialState = {
//   count: 0,
//   text: "hello",
// }

// const useMyState = () => useState(initialState)

// const MyContext = createContext<ReturnType<typeof useMyState> | null>(null)

// export const useSharedState = () => {
//   const value = useContext(MyContext)
//   if (value === null) throw new Error("Please add SharedStateProvider")
//   return value
// }

// export const SharedStateProvider = ({ children }: { children: ReactNode }) => (
//   <MyContext.Provider value={useMyState()}>{children}</MyContext.Provider>
// )

const initialState: { [string: string]: string | number } = {
  count: 0,
  text: "hello",
}

const useMyState = () => useState(initialState)

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState)
