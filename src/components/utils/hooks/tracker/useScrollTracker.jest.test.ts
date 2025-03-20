import { fireEvent, renderHook, act } from "@testing-library/react"
import useScrollTracker from "./useScrollTracker"

describe("useScrollTracker", () => {
  const renderCustomHook = () => renderHook(useScrollTracker)

  it("should move mouse with initial 0 data", () => {
    const { result } = renderCustomHook()
    fireEvent.scroll(window, { target: { scrollX: 100, scrollY: 200 } })
    expect(result.current.scrollToTop).toStrictEqual({
      x: 100,
      y: 200,
    })
  })
})
