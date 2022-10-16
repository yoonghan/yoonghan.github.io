import { usePwaHooks } from "./usePwaHooks"
import { renderHook, waitFor } from "@testing-library/react"
import "../../../__mocks__/windowMock"
import {
  setServiceNavigator,
  spyOnReferrer,
} from "../../../__mocks__/windowMock"

describe("usePwaHooks", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should be false when autoregister set to FALSE", () => {
    const { result } = renderHook(usePwaHooks, { initialProps: false })
    const [_, isTwaApp] = result.current
    expect(isTwaApp).toBeFalsy()
  })

  it("should be false when autoregister is TRUE but without valid registration", () => {
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const [_, isTwaApp] = result.current
    expect(isTwaApp).toBeFalsy()
  })

  it("should be true when autoregister is TRUE but with valid android registration", () => {
    spyOnReferrer("android-app://com.walcron.web")
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const [_, isTwaApp] = result.current
    expect(isTwaApp).toBeTruthy()
  })

  it("should be true when autoregister is TRUE but with valid url path", () => {
    window.location.href = "?utm_source=launcher"
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    const [_, isTwaApp] = result.current
    expect(isTwaApp).toBeTruthy()
  })

  it("should be registered if service worker defined ok", async () => {
    setServiceNavigator()
    const { result } = renderHook(usePwaHooks, { initialProps: true })
    await waitFor(
      () => {
        const [isRegistered] = result.current
        return expect(isRegistered).toBeTruthy()
      },
      { interval: 50 }
    )
  })
})
