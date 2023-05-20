import "../../__mocks__/localStorageMock"
import { getTermsRead, KEY } from "./cookie-util"

describe("Cookie Util", () => {
  const expectedKeyName = "termsRead"

  it("key name is COOKIE_KEY", () => {
    expect(KEY).toBe(expectedKeyName)
  })

  it("should update localstorage when accessed", () => {
    expect(localStorage.getItem(expectedKeyName)).toBeUndefined
    expect(getTermsRead()).toBeFalsy()
    expect(localStorage.getItem(expectedKeyName)).toBeTruthy()
    expect(getTermsRead()).toBeTruthy()
  })
})
