import { useEffect, useState } from "react"

export const disableAnimationRegex = /.*[\?|\&]animate=false.*/

export function useDisableAnimation() {
  const [isAnimatable, setIsAnimatable] = useState(false)

  useEffect(() => {
    var query = window.location.search
    const disabled = disableAnimationRegex.test(query)
    setIsAnimatable(!disabled)
  }, [])

  return {
    isAnimatable,
  }
}
