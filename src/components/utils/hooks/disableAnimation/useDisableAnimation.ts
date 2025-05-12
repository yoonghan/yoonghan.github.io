import { useEffect, useState } from "react"

export const disableAnimationRegex = /.*[?|&]animate=none.*/

export function useDisableAnimation() {
  const [isAnimatable, setIsAnimatable] = useState(false)

  useEffect(() => {
    let query = window.location.search
    const disabled = disableAnimationRegex.test(query)
    setIsAnimatable(!disabled)
  }, [])

  return {
    isAnimatable,
  }
}
