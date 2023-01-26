import { ComponentType, useCallback, useEffect, useRef } from "react"
import { createConfirmation } from "react-confirm"
import dialogRootCreator from "../dialogRootCreator"

export const useDialogCreation = <T>(component: ComponentType<T>) => {
  const confirmationRef = useRef<(props: T) => Promise<string>>()

  useEffect(() => {
    const elem = dialogRootCreator.create()
    confirmationRef.current = createConfirmation(component, 1000, elem)
  }, [component])

  const confirm = useCallback(async (props: T) => {
    if (confirmationRef.current) {
      await confirmationRef.current({ ...props })
    }
  }, [])

  return confirm
}
