import { useEffect, useState } from "react"

const useScrollTracker = () => {
  const [scrollToTop, setScrollToTop] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleScroll = (_event: Event) => {
      setScrollToTop({ x: window.scrollX, y: window.scrollY })
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
