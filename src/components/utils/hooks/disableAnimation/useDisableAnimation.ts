import { search } from "@/util/location"
import { useEffect, useState } from "react"

export const disableAnimationRegex = /.*[?|&]animate=none.*/

export function useDisableAnimation() {
  const [isAnimatable, setIsAnimatable] = useState(false)

  useEffect(() => {
    const query = search()
    const disabled = disableAnimationRegex.test(query)
    setIsAnimatable(!disabled)
  }, [])

  return {
    isAnimatable,
  }
}
