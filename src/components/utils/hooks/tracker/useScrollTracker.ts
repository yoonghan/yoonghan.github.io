import { useEffect, useState } from "react"

const useScrollTracker = () => {
  const [scrollToTop, setGlobalMouseDistanceFromTarget] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleScroll = (_event: Event) => {
      setGlobalMouseDistanceFromTarget({ x: window.scrollX, y: window.scrollY })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    scrollToTop,
  }
}

export default useScrollTracker
