import { ComponentType, useCallback, useEffect, useRef } from "react"
import { createConfirmation } from "react-confirm"
import dialogRootCreator from "./dialogRootCreator"

export const useDialogCreation = <T>(component: ComponentType<T>) => {
  const confirmationRef = useRef<(props: T) => Promise<string>>()

  useEffect(() => {
    const elem = dialogRootCreator.create()
    confirmationRef.current = createConfirmation(component, 1000, elem)
  }, [component])

  const confirm = useCallback((props: T) => {
    if (confirmationRef.current) {
      confirmationRef.current({ ...props, nonPortal: true })
    }
  }, [])

  return confirm
}
