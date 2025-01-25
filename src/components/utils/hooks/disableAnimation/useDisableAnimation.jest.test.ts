import { renderHook } from "@testing-library/react"
import {
  disableAnimationRegex,
  useDisableAnimation,
} from "./useDisableAnimation"

describe("useDisableAnimation", () => {
  it("should default isAnimatable true", () => {
    const { result } = renderHook(useDisableAnimation, {})
    expect(result.current.isAnimatable).toBe(true)
  })

  it("should not isAnimatable, if query string animatable=false", () => {
    Object.defineProperty(window, "location", {
      value: { search: "?animate=false" },
      writable: true,
    })

    const { result } = renderHook(useDisableAnimation, {})
    expect(result.current.isAnimatable).toBe(false)

    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: false,
    })
  })

  it("should return correctly define disableAnimation REGEX", () => {
    expect(disableAnimationRegex.test("?animate=false")).toBe(true)
    expect(disableAnimationRegex.test("animate=false")).toBe(false)
    expect(disableAnimationRegex.test("?animate=true")).toBe(false)
    expect(disableAnimationRegex.test("?a=1&animate=false&b=2")).toBe(true)
  })
})
