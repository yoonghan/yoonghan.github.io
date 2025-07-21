import { useCallback, useEffect, useRef } from "react"
import { ConfirmDialog, createConfirmation, confirmable } from "react-confirm"
import dialogRootCreator from "../dialogRootCreator"

export const useDialogCreation = <T>(component: ConfirmDialog<T, string>) => {
  const confirmationRef = useRef<(props: T) => Promise<string>>(undefined)

  useEffect(() => {
    const elem = dialogRootCreator.create()
    confirmationRef.current = createConfirmation(
      confirmable(component),
      1000,
      elem,
    )
  }, [component])

  const confirm = useCallback(async (props: T) => {
    if (confirmationRef.current) {
      await confirmationRef.current({ ...props })
    }
  }, [])

  return confirm
}
