import { isIOS, isSafariBrowser, isMacOrIOS, isAndroid } from "./browserCheck"
import "@/__tests__/mocks/windowMock"
import { spyAsIPad, spyAsAndroid } from "@/__tests__/mocks/windowMock"

describe("BrowserCheck", () => {
  const originalWindowHtmlElem = window["HTMLElement"]
  const originalSafari = window["safari" as any]
  const originalMsStream = window["MSStream" as any]

  afterEach(() => {
    window["HTMLElement"] = originalWindowHtmlElem
    window["safari" as any] = originalSafari
    window["MSStream" as any] = originalMsStream
  })

  describe("isAndroid", () => {
    it("should consider as android", () => {
      spyAsAndroid()
      expect(isAndroid()).toBeTruthy()
    })
  })

  describe("isSafariBrowser", () => {
    it("should consider as safari if there is a HTMLElement constructor", () => {
      window["HTMLElement" as any] = "constructor" as any
      expect(isSafariBrowser()).toBeTruthy()
    })

    it("should consider as safari if pushNotification is SafariRemoteNotification", () => {
      window["HTMLElement" as any] = "" as any
      window["safari" as any] = {
        pushNotification: "[object SafariRemoteNotification]",
      } as any
      expect(isSafariBrowser()).toBeTruthy()
    })
  })

  describe("isIOS", () => {
    it("should identify as iOS if detected with iPhone/iPad and not msstream", () => {
      spyAsIPad()
      window["MSStream" as any] = false as any
      expect(isIOS()).toBeTruthy()
    })
  })

  describe("isMacOrIOS", () => {
    it("should be iOS or Mac if isSafariBrowser", () => {
      window["HTMLElement" as any] = "constructor" as any
      expect(isMacOrIOS()).toBeTruthy()
    })

    it("should be iOS or Mac if isIOS", () => {
      window["HTMLElement" as any] = "" as any
      window["safari" as any] = "" as any
      spyAsIPad()
      window["MSStream" as any] = false as any

      expect(isMacOrIOS()).toBeTruthy()
    })
  })
})
