import { usePwaHooks } from "./usePwaHooks"
import { renderHook, waitFor } from "@testing-library/react"
import {
  setServiceNavigator,
  spyOnReferrer,
} from "@/__tests__/mocks/windowMock"

describe("usePwaHooks", () => {
  it("should be false when autoregister set to FALSE", () => {
    const { result } = renderHook(usePwaHooks, { initialProps: false })
    const { isTwaApp } = result.current
    expect(isTwaApp).toBeFalsy()
  })

  it("should be false when autoregister is TRUE but without valid registration", () => {
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const { isTwaApp } = result.current
    expect(isTwaApp).toBeFalsy()
  })

  it("should be true when autoregister is TRUE but with valid android registration", () => {
    spyOnReferrer("android-app://com.walcron.web")
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const { isTwaApp } = result.current
    expect(isTwaApp).toBeTruthy()
  })

  it("should be true when autoregister is TRUE but with valid url path", () => {
    window.location.href = "?utm_source=launcher"
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const { isTwaApp } = result.current
    expect(isTwaApp).toBeTruthy()
  })

  describe("service worker", () => {
    //Once set can't go back
    beforeAll(() => {
      setServiceNavigator()
    })

    it("should be registered if service worker defined ok", async () => {
      const { result } = renderHook(usePwaHooks, { initialProps: true })
      await waitFor(
        () => {
          const { isRegistered } = result.current
          return expect(isRegistered).toBeTruthy()
        },
        { interval: 50 }
      )
    })

    it("should enable to do a registration when ready", async () => {
      const { result } = renderHook(usePwaHooks, { initialProps: true })
      await waitFor(
        () => {
          const { isRegistered } = result.current
          return expect(isRegistered).toBeTruthy()
        },
        { interval: 50 }
      )
      const { isLatestInstalled, hasLatestUpdate } = result.current
      expect(hasLatestUpdate).toBe(true)
      expect(isLatestInstalled).toBe(true)
    })
  })
})
