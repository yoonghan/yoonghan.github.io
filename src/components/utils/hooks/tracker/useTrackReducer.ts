import { debounce } from "@yoonghan/walcron-microfrontend-shared"
import { useCallback, useReducer, useRef } from "react"

enum Actions {
  APPEND,
}

interface Action {
  type: Actions
  value: number
  max: number
}

function reducer(state: number[], action: Action) {
  const { value, type, max } = action

  switch (type) {
    case Actions.APPEND:
      return [
        value,
        ...(state.length === max ? state.slice(0, max - 1) : state),
      ]
  }
}

export const useTrackReducer = ({
  initialData = [],
  maxStorage = 10,
  allowStorageAfterMiliseconds = 20,
}: {
  initialData?: number[]
  maxStorage?: number
  allowStorageAfterMiliseconds?: number
}) => {
  var canStore = useRef(true)
  const [data, dispatch] = useReducer(reducer, initialData)
  const append = useCallback(
    (value: number) => {
      if (canStore.current) {
        dispatch({ type: Actions.APPEND, value, max: maxStorage })
        canStore.current = false

        setTimeout(() => {
          canStore.current = true
        }, allowStorageAfterMiliseconds)
      }
    },
    [allowStorageAfterMiliseconds, maxStorage]
  )

  return {
    data,
    append,
  }
}
